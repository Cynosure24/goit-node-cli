import { promises as fs } from "fs";
import path from "path";

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const readResult = await fs.readFile(contactsPath);
    const contactsObject = JSON.parse(readResult);
    return contactsObject;
  } catch (error) {
    return error;
  }
}

async function getContactById(contactId) {
  try {
    const contactsObject = await listContacts();
    const contactById = contactsObject.find(
      (contact) => contact.id === contactId
    );
    return contactById || null;
  } catch (error) {
    return error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const removeContactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (removeContactIndex !== -1) {
      const removeContact = contacts.splice(removeContactIndex, 1)[0];
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return removeContact;
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contactObject = await listContacts();
    const newContact = { id: Date.now(), name, email, phone };
    contactObject.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactObject));
    return newContact;
  } catch (error) {
    return error;
  }
}
export { listContacts, getContactById, removeContact, addContact };