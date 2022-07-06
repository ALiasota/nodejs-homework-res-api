const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

const { addUserValidation } = require("../../middlewares/validationMiddleware");

const {
  registrationController,
  loginController,
} = require("../../controllers/authController");

router.post(
  "/register",
  addUserValidation,
  asyncWrapper(registrationController)
);

router.post("/login", addUserValidation, asyncWrapper(loginController));

module.exports = { authRouter: router };
