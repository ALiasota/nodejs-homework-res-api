const express = require("express");
const path = require("path");
const router = express.Router();

const storagePath = path.resolve("./public/avatars");

router.use("/", express.static(storagePath));

module.exports = { avatarRouter: router };
