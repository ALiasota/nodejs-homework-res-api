const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../services/contactsServices");

const listContactsController = async (req, res) => {
  const contacts = await listContacts();
  res.json({ status: "success", code: 200, payload: { contacts } });
};

const getByIdController = async (req, res) => {
  const contactId = req.params.contactId;

  const contact = await getById(contactId);
  if (!contact) {
    res.status(400).json({
      status: `Failure, we didn't find the contact width id=${contactId}`,
    });
  }
  res.json({ status: "success", code: 200, payload: { contact } });
};

const addContactController = async (req, res) => {
  const { name, email, phone } = req.body;
  addContact({ name, email, phone });
  res.json({ status: "Success" });
};

const removeContactController = async (req, res) => {
  const contactId = req.params.contactId;
  removeContact(contactId);
  res.json({ status: "Success" });
};

const updateContactController = async (req, res) => {
  const contactId = req.params.contactId;
  const { name, email, phone } = req.body;
  updateContact(contactId, { name, email, phone });
  res.json({ status: "Success" });
};

const updateStatusContactController = async (req, res) => {
  try {
    const contactId = req.params.contactId;

    const { favorite } = req.body;

    if (!favorite && favorite !== false) {
      res.status(400).json({
        status: "missing field favorite",
      });
    }
    await updateStatusContact(contactId, { favorite });
    const contact = await getById(contactId);

    res.json({ status: "success", code: 200, payload: { contact } });
  } catch {
    res.status(404).json({
      status: " Not found ",
    });
  }
};

module.exports = {
  listContactsController,
  getByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
};
