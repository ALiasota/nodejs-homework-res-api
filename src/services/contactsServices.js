const { Contact } = require("../models/contacts");

const listContacts = async (owner, { page, limit, favorite }) => {
  const skip = (page - 1) * limit;
  let contacts = [];
  if (favorite) {
    contacts = await Contact.find({ owner, favorite: true })
      .select({ __v: 0 })
      .skip(skip)
      .limit(limit);
  } else {
    contacts = await Contact.find({ owner })
      .select({ __v: 0 })
      .skip(skip)
      .limit(limit);
  }
  return contacts;
};

const getById = async ({ contactId, owner }) => {
  const contact = await Contact.findOne({ _id: contactId, owner });
  return contact;
};

const addContact = async ({ name, email, phone, owner }) => {
  const contact = new Contact({ name, email, phone, owner });
  await contact.save();
};

const removeContact = async ({ contactId, owner }) => {
  await Contact.findByIdAndRemove({ _id: contactId, owner });
};

const updateContact = async (contactId, owner, { name, email, phone }) => {
  await Contact.findByIdAndUpdate(
    { _id: contactId, owner },
    { $set: { name, email, phone } }
  );
};

const updateStatusContact = async (contactId, owner, { favorite }) => {
  await Contact.findByIdAndUpdate(
    { _id: contactId, owner },
    { $set: { favorite } }
  );
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
