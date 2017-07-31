import * as firebase from 'firebase-admin'
import { paths } from '../config'
const serviceAccount = require(paths.serviceAccount)

let firebaseapp

export const getRef = (databaseURL) => {
  if (!firebaseapp) {
    firebaseapp = firebase.initializeApp({
      databaseURL,
      credential: firebase.credential.cert(serviceAccount), // needed if auth is missing
    })
  }

  return firebaseapp.database().ref('/')
}


/**
 * Run a promise for each child at a ref
 * @param  {FirebaseRef} ref  [description]
 * @param  {Function} func Function to run for each child. First argument is child snapshot
 * @return {Promise} Array of promise results
 */
export const runForEachChild = (ref, promiseFunc, errMsg) =>
  ref.once('value')
    .then(snap => {
      const promises = []
      snap.forEach(childSnap => {
        promises.push(promiseFunc(childSnap))
      })
      return Promise.all(promises)
    })
    .catch(err => {
      const msg = errMsg || 'Error running action on children'
      console.log(`${msg}:\n\t${JSON.stringify(err)}`) // eslint-disable-line no-console
      return Promise.reject(err)
    })


export default { getRef }
