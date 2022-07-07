const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  addContactValidation,
} = require("../../middlewares/validationMiddleware");

const { authValidation } = require("../../middlewares/authMiddleware");

const {
  listContactsController,
  getByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/contactsController");

router.use(authValidation);

router.get("/", asyncWrapper(listContactsController));

router.get("/:contactId", asyncWrapper(getByIdController));

router.post("/", addContactValidation, asyncWrapper(addContactController));

router.delete("/:contactId", asyncWrapper(removeContactController));

router.put(
  "/:contactId",
  addContactValidation,
  asyncWrapper(updateContactController)
);

router.put("/:contactId/favorite", asyncWrapper(updateStatusContactController));

module.exports = { contactsRouter: router };
