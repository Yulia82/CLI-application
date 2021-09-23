const path = require('path')
const fs = require('fs/promises')
const crypto = require('crypto')


const contactsPath = path.join(__dirname, 'db/contacts.json');

const readContacts = async () => {
  const result = await fs.readFile(contactsPath,
    'utf8');
  
  const contacts = JSON.parse(result);
  return contacts;
}

function listContacts() {
  return readContacts();
}

async function getContactById(contactId) {
  const allContacts = await readContacts();
  const result = allContacts.filter(contact => contact.id == contactId);
  return result;
}

async function removeContact(contactId) {
  const allContacts = await readContacts();
  
  const indexContact = allContacts.findIndex(contact => contact.id == contactId);
  if (indexContact === -1) {
    return `Contact with id: ${contactId} not found`;
  }

  const deleteContact = allContacts.splice(indexContact, 1);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return `Contact delete`;
  } catch (error) {
      console.log(error);
    }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  const allContacts = await readContacts();
  allContacts.push(newContact);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return;
  } catch (error) {
      console.log(error);
    }
}

async function getContactByUserName(userName) {
  const allContacts = await readContacts();
  const result = allContacts.filter(contact => contact.name == userName);
  return result;
}

async function getContactByUserEmail(userEmail) {
  const allContacts = await readContacts();
  const result = allContacts.filter(contact => contact.email == userEmail);
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  getContactByUserName,
  getContactByUserEmail,
}