import path from 'path';
import { cyan, yellow } from 'chalk';

export const header = `\t${cyan.underline('Reside')} Data Migration Tool\n`;

export const greetings = [
  'Hey!  Lets update some data!',
  'We are going to have a great time updating data!',
  'Its a great time to update your data!',
  'Go go gadget data!',
  'Go data, its your birthday.  Go data, its your birthday.',
  'Data vs Spock - who was better?',
];

export const goodbyes = [
  'Go do great things!',
  'Have a wonderful day :)',
  'You did such a great job',
  'Awww yeaaahh!',
  'Go data, its your birthday.  Go data, its your birthday.',
  'Be cool, but also be warm.',
];

export const missingSAWarning = `${yellow('Your service account is missing! If database rules are not disabled, this CLI will not work.')}\n`;

export const paths = {
  base: path.join(__dirname, '..'),
  atBase: (childPath) => path.join(__dirname, '..', childPath),
  previousAnswers: path.join(__dirname, '..', 'previousAnswers.json'),
  serviceAccount: path.join(__dirname, '..', 'service-account.json'),
};

export default { paths };
