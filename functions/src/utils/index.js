import fs from 'fs'
import inquirer from 'inquirer'
import { invoke, has } from 'lodash'
import { magenta } from 'chalk'
import * as modules from '../modules'
import { greetings, missingSAWarning, header, paths } from '../config'

let previousAnswers

export const loadPreviousAnswers = () => {
  // Attempt to load previous answers
  try {
    previousAnswers = require(paths.previousAnswers) // eslint-disable-line
  } catch (e) {
    previousAnswers = {}
  }
  return previousAnswers
}

export const randomFromList = (list) =>
  list[Math.floor(Math.random() * list.length)]

export const saveAnswers = (answers) =>
  new Promise((resolve, reject) => {
    const fileStr = JSON.stringify(answers, 0, 2)
    fs.writeFile(paths.previousAnswers, fileStr, err => {
      if (err) {
        reject(err)
      } else {
        resolve(answers)
      }
    })
  })

export const getFromFile = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(data))
      }
    })
  })

export const runCli = (questions, getActionAndProps) => {
  // Greet user
  console.log(header) // eslint-disable-line no-console
  console.log(magenta(`${randomFromList(greetings)} \n\n`)) // eslint-disable-line no-console

  // Warn if no service account
  if (!fs.existsSync(paths.serviceAccount)) {
    console.log(missingSAWarning) // eslint-disable-line no-console
  }

  // prompt user with questions
  return inquirer.prompt(questions)
    .then((answers) => saveAnswers(answers))
    .then((answers) => {
      const { action, props } = getActionAndProps(answers)
      if (!has(modules, action)) {
        throw new Error('Action does not exist')
      }
      return invoke(modules, action, ...props)
    })
}
