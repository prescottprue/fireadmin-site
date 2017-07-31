/* eslint-disable no-console */
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const path = require('path')
const os = require('os')
const fs = require('fs')
const mkdirp = require('mkdirp-promise')
const gcs = require('@google-cloud/storage')()
const modules = require('./dist/modules')
const mainApp = admin.initializeApp(functions.config().firebase)
const bucket = gcs.bucket(functions.config().firebase.storageBucket)

exports.dataMigration = functions.database.ref('/requests/migration/{pushId}')
  .onCreate((event) => {
    console.log('Running migration', event.data.val())
    const eventData = event.data.val()
    const filePath = eventData.serviceAccount
    const tempLocalFile = path.join(os.tmpdir(), filePath)
    const tempLocalDir = path.dirname(tempLocalFile)
    // Create Temporary directory
    return mkdirp(tempLocalDir)
      // Download file from bucket
      .then(() =>
         bucket.file(filePath).download({ destination: tempLocalFile })
      )
      .then(() => {
        const secondApp = admin.initializeApp({
          credential: admin.credential.cert(tempLocalFile),
          databaseURL: eventData.databaseURL
        }, 'app2')
        const copyPath = eventData.copyPath || 'projects'
        console.log('initialize completed, copying data in ', copyPath)
        return mainApp.database().ref(copyPath)
          .once('value')
          .then((snap) => secondApp.database().ref(copyPath).set(snap.val()))
      })
      .then(() => {
        console.log('Finished, migrating data, Cleaning up...')
        // Once the image has been uploaded delete the local files to free up disk space.
        fs.unlinkSync(tempLocalFile)
        return filePath
      })
      .then(() =>
        event.data.adminRef.ref.root
          .child(`responses/migration/${event.params.pushId}`)
          .set({
            completed: true,
            completedAt: admin.database.ServerValue.TIMESTAMP
          })
      )
      .catch((err) => {
        console.log('Error running migration:', err.toString ? err.toString() : err)
        return Promise.reject(err)
      })
  })




exports.dataAction = functions.database.ref('/requests/action/{pushId}')
  .onCreate((event) => {
    const data = event.data.val()
    if (!modules[data.action] || typeof modules[data.action] !== 'function') {
      console.error('Action does not exist or is not a function.', data.action)
      return Promise.reject(new Error('Action does not exist or is not a function'))
    }
    if (!data.args) {
      console.error('Args are required to run action', data.action)
      return Promise.reject(new Error('Action does not exist or is not a function'))
    }
    return modules[data.action](event, data.args)
    .then(() =>
      event.data.adminRef.ref.root
        .child(`responses/action/${event.params.pushId}`)
        .set({
          completed: true,
          completedAt: admin.database.ServerValue.TIMESTAMP
        })
    )
    // .then(() => {
    //   console.log('Finished, migrating data, Cleaning up...')
    //   // Once the image has been uploaded delete the local files to free up disk space.
    //   fs.unlinkSync(tempLocalFile)
    //   return filePath
    // })
    .catch((err) => {
      console.log('Error running action:', err.toString ? err.toString() : err)
      return Promise.reject(err)
    })
  })
