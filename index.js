const { Command } = require('commander');
const chalk = require('chalk');
const { listContacts, getContactById, addContact, removeContact, getContactByUserName, getContactByUserEmail } = require('./contacts');


const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
console.log('process.argv', process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts()
        .then((contacts) => console.table(contacts))
        .catch(console.error);
      break;

    case 'get':
      if (process.argv.includes('--id') || process.argv.includes('-i')) {
        getContactById(id).then(([result]) => {
          if (result) {
            console.log(chalk.bgGrey('Contact found'));
            console.log(result);
          } else {
            console.log(chalk.bgRed('Contact not found'))
          }
        });
      }

      if (process.argv.includes('--name') || process.argv.includes('-n')) {
        getContactByUserName(name).then(([result]) => {
          if (result) {
            console.log(chalk.bgGrey('Contact found'));
            console.log(result);
          } else {
            console.log(chalk.bgRed('Contact not found'))
          }
        });
      }

      if (process.argv.includes('--email') || process.argv.includes('-e')) {
        getContactByUserEmail(email).then(([result]) => {
          if (result) {
            console.log(chalk.bgGrey('Contact found'));
            console.log(result);
          } else {
            console.log(chalk.bgRed('Contact not found'))
          }
        });
      }
      break;

    case 'add':
      addContact(name, email, phone);
      break;

    case 'remove':
      removeContact(id)
        .then(result => console.log(chalk.bgBlue(result)))
        .catch(console.error);
      break;

    default:
      console.warn(chalk.red('[31m Unknown action type!'));
  }
}

invokeAction(argv);