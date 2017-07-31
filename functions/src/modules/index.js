/* eslint-disable no-console */
import { blue, red } from 'chalk'
import { get, pick, reduce, set, last, has } from 'lodash'
import { paths } from '../config'
import { getFromFile } from '../utils'
import { runForEachChild } from '../utils/firebase'

export const actionFromEvent = (event, ref) => {
  const {
    action,
    childPath = 'transactions/listings',
    structurePath = 'document_templates_structures',
    filePath = 'pr.json',
    newVal = '',
    propertiesToMove = 'versions',
    keepPath,
    keepVal,
    propertiesToMoveToMeta,
    propertiesToExcludeFromStructure
  } = event.data.val()
  switch (action) {
    case 'keepItemsWith':
      return { action, props: [ref, childPath, keepPath, keepVal] }
    case 'linkLists':
    case 'slugToKey':
    case 'pushListToKeyList':
    case 'addToEach':
    case 'removeFromEach':
      return { action, props: [ref, childPath, keepPath] }
    case 'updateFromFile':
      return { action, props: [ref, childPath, filePath] }
    case 'replaceParam':
      return { action, props: [ref, childPath, keepPath, keepVal, newVal] }
    case 'destructureObjectsInList':
      return {
        action,
        props: [
          ref,
          childPath,
          structurePath,
          propertiesToMove,
          propertiesToMoveToMeta,
          propertiesToExcludeFromStructure
        ]
      }
    default:
      console.error('Action type not found. Check getActionAndProps in utils/index.js') // eslint-disable-line no-console
      return action
  }
}
/**
 * Update each child with data object
 * @param {FirebaseRef} fbRef - Root firebase reference
 * @param {String} listPath - Path of list of children from root of database
 * @param {Object} updatedData - Data to update each child with
 * @return Array of results of each child update promise
 */
export const addToEach = (fbRef, listPath, updatedData) =>
  runForEachChild(
    fbRef.child(listPath),
    childSnap => childSnap.ref.update(updatedData),
    'Error adding to each'
  )

/**
 * Load data from a JSON file and update it to a location
 * @param {FirebaseRef} fbRef - Root firebase reference
 * @param {String} listPath - Path of list of children from root of database
 * @param {Object} updatedData - Data to update each child with
 * @return Array of results of each child update promise
 */
export const updateFromFile = (fbRef, listPath, uploadFilePath) =>
  getFromFile(paths.atBase(uploadFilePath))
    .then((fileData) => fbRef.child(listPath).update(fileData))

/**
 * Remove parameter from each child in a list
 * @param {FirebaseRef} fbRef - Root firebase reference
 * @param {String} listPath - Path of list of children from root of database
 * @param {String} paramPath - Path of parameter to remove
 * @return Array of results of each child update promise
 */
export const removeFromEach = (fbRef, childPath, paramPath) =>
  runForEachChild(
    fbRef.child(childPath),
    childSnap => childSnap.ref.child(paramPath).remove(),
    'Error removing from each'
  )

/**
 * Keep items that have a parameter with a certain value.
 * @param {FirebaseRef} fbRef - Root firebase reference
 * @param {String} listPath - Path of list of children from root of database
 * @param {Object} updatedData - Data to update each child with
 * @return Array of results of each child update promise
 */
export const keepItemsWith = (fbRef, listPath, keepPath, keepVal) =>
  runForEachChild(
    fbRef.child(listPath),
    childSnap => {
      if (get(childSnap.val(), keepPath) !== keepVal) {
        console.log(blue(`removing ${childSnap.key} since ${keepPath} is not ${keepVal}`))
        return childSnap.ref.remove()
      }
      // just return a value instead of a promise
      return childSnap
    },
    `Error Keeping Items with ${keepPath}: ${keepVal}`
  )

/**
 * Keep items that have a parameter with a certain value.
 * @param {FirebaseRef} fbRef - Root firebase reference
 * @param {String} listPath - Path of list of children from root of database
 * @param {Object} updatedData - Data to update each child with
 * @return Array of results of each child update promise
 */
export const replaceParam = (fbRef, childPath, keepPath, originalVal, newVal) =>
  runForEachChild(
    fbRef.child(childPath),
    childSnap => {
      let typedNewVal = newVal
      if (newVal === 'true') {
        typedNewVal = true
      } else if (newVal === 'false') {
        typedNewVal = false
      } else if (newVal === 'null') {
        typedNewVal = null
      }

      let typedOldVal = originalVal
      if (originalVal === 'true') {
        typedOldVal = true
      } else if (originalVal === 'false') {
        typedOldVal = false
      } else if (originalVal === 'null') {
        typedOldVal = null
      }

      if (get(childSnap.val(), keepPath) === typedOldVal) {  //eslint-disable-line
        console.log(blue(`replacing ${keepPath} of ${childSnap.key} since ${keepPath} is ${originalVal}`))
        return childSnap.ref.update({ [keepPath]: typedNewVal })
      }
      return childSnap
    },
    'Error replacing param'
  )

// push vendors with categorySlug matching slug to vendors parameter of items in vendor_categories
export const linkLists = (fbRef, childPath = 'vendor_categories', linkFromPath = 'vendors', paramToLinkFrom = 'slug', paramToLinkTo = 'categorySlug') =>
  fbRef.child(childPath).once('value')
    .then(snap => {
      const promises = []
      snap.forEach(childSnap => {
        // For each vendor category
        // Get slug, find vendors with matching categorySlug
        // For each maching vendor push to vendors
        // Push to vendors categories
        const slug = get(childSnap.val(), paramToLinkFrom)
        if (slug) {
          fbRef.child(linkFromPath)
            .orderByChild(paramToLinkTo)
            .equalTo(slug)
            .once('value')
            .then((matchingVendors) => {
              matchingVendors.forEach(v => {
                promises.concat(
                  [
                    childSnap.ref.child(linkFromPath).push(v.key),
                    v.ref.child('categories').push(childSnap.key),
                  ]
                )
              })
            })
        }
      })
      return Promise.all(promises)
    })
    .catch(err => {
      console.log(red(`Error adding to each: ${JSON.stringify(err)}`))
      return Promise.reject(err)
    })

// push vendors with categorySlug matching slug to vendors parameter of items in vendor_categories
export const pushListToKeyList = (fbRef, childPath = 'vendor_categories', keepPath = 'vendors') =>
  runForEachChild(
    fbRef.child(childPath),
    childSnap => {
      if (childSnap.child(keepPath).val()) {
        const promises = []
        console.log(`converting ${childSnap.key}.${keepPath} into Key List`)
        childSnap.child(keepPath).forEach(grandChildSnap => {
          if (grandChildSnap.val() !== true) {
            promises.push([
              childSnap.ref.child(keepPath).child(grandChildSnap.val()).set(true), // add under new key
              grandChildSnap.ref.remove(), // remove
            ])
          }
        })
        return Promise.all(promises)
      }
      return childSnap
    },
    `Error converting push list to key list at ${childPath}`
  )

// { draft: { op, we, er }, published: { op, we, er }}
const removeProps = (obj, removeList = []) => {
  removeList.forEach(path => set(obj, path, null))
  return obj
}

export const destructureObjectsInList = (
    fbRef,
    sourceListPath = 'document_templates',
    structurePath = 'document_templates_structures',
    properties = 'versions',
    propertiesToMoveToMeta,
    propertiesToExcludeFromStructure,
  ) =>
    runForEachChild(
      fbRef.child(sourceListPath),
      childSnap => {
        const pickedProperties = properties.split(', ')
        const moveToMeta = propertiesToMoveToMeta.split(', ')
        const removeProperties = propertiesToExcludeFromStructure.split(', ')
        // the document template ref
        // get the key of the object
        const key = childSnap.key
        const data = childSnap.val()
        moveToMeta.forEach(p => {
          let [location, propName] = p.split(':') // eslint-disable-line prefer-const
          if (!propName) {
            propName = last(location.split('.'))
          }
          if (has(data, location)) {
            data[propName] = get(data, location)
          }
        })
        // get the value of the object
        const structure = reduce(
          pick(data, pickedProperties),
          (acc, val) => ({ ...acc, ...removeProps(val, removeProperties) }),
          {}
        )
        // pick the properties that will be moved
        // remove the properties that where moved
        pickedProperties.forEach(p => delete data[p])
        // create a new structure object { [key] = { picked props }}
        // update the object to remove moved properties
        return Promise.all([
          childSnap.ref.set({ ...data }),
          fbRef.child(structurePath).child(key).set({ ...structure }),
        ])
      }
    )
