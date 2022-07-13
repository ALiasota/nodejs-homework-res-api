const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

router.get("/:avatar", asyncWrapper());

module.exports = { avatarRouter: router };
