const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  addUserValidation,
  ChangeUserValidation,
} = require("../../middlewares/validationMiddleware");
const { authValidation } = require("../../middlewares/authMiddleware");
const {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  changeSubscriptionController,
} = require("../../controllers/authController");

router.post(
  "/register",
  addUserValidation,
  asyncWrapper(registrationController)
);

router.post("/login", addUserValidation, asyncWrapper(loginController));

router.post("/logout", authValidation, asyncWrapper(logoutController));

router.get("/current", authValidation, asyncWrapper(currentUserController));

router.patch(
  "/",
  authValidation,
  ChangeUserValidation,
  asyncWrapper(changeSubscriptionController)
);

module.exports = { authRouter: router };
