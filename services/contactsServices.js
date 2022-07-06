const { Contact } = require("../models/contacts");

const listContacts = async () => {
  const contacts = await Contact.find({});

  return contacts;
};

const getById = async (contactId) => {
  const contact = await Contact.findOne({ _id: contactId });
  console.log(contact);
  return contact;
};

const addContact = async ({ name, email, phone }) => {
  const contact = new Contact({ name, email, phone });
  await contact.save();
};

const removeContact = async (contactId) => {
  await Contact.findByIdAndRemove({ _id: contactId });
};

const updateContact = async (contactId, { name, email, phone }) => {
  console.log(contactId);
  await Contact.findByIdAndUpdate(
    { _id: contactId },
    { $set: { name, email, phone } }
  );
};

const updateStatusContact = async (contactId, { favorite }) => {
  await Contact.findByIdAndUpdate({ _id: contactId }, { $set: { favorite } });
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
