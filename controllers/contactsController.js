const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../services/contactsServices");

const listContactsController = async (req, res) => {
  const { user: owner } = req;
  let { page = 1, limit = 5, favorite = false } = req.query;
  limit = parseInt(limit) > 10 ? 10 : parseInt(limit);
  page = parseInt(page);
  const contacts = await listContacts(owner, { page, limit, favorite });
  res.json({ status: "success", code: 200, payload: { contacts } });
};

const getByIdController = async (req, res) => {
  const contactId = req.params.contactId;
  const { user: owner } = req;
  const contact = await getById({ contactId, owner });
  if (!contact) {
    res.status(400).json({
      status: `Failure, we didn't find the contact width id=${contactId}`,
    });
  }
  res.json({ status: "success", code: 200, payload: { contact } });
};

const addContactController = async (req, res) => {
  const { user: owner } = req;
  const { name, email, phone } = req.body;
  addContact({ name, email, phone, owner });
  res.json({ status: "Success" });
};

const removeContactController = async (req, res) => {
  const { user: owner } = req;
  const contactId = req.params.contactId;
  removeContact({ contactId, owner });
  res.json({ status: "Success" });
};

const updateContactController = async (req, res) => {
  const { user: owner } = req;
  const contactId = req.params.contactId;
  const { name, email, phone } = req.body;
  updateContact(contactId, owner, { name, email, phone });
  res.json({ status: "Success" });
};

const updateStatusContactController = async (req, res) => {
  const { user: owner } = req;
  try {
    const contactId = req.params.contactId;

    const { favorite } = req.body;

    if (!favorite && favorite !== false) {
      res.status(400).json({
        status: "missing field favorite",
      });
    }
    await updateStatusContact(contactId, owner, { favorite });
    const contact = await getById({ contactId, owner });

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
