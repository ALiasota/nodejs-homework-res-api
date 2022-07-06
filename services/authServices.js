const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/users");

const registration = async ({ email, password }) => {
  const user = new User({
    email,
    password,
  });
  await user.save();
};
const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null;
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  return token;
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

module.exports = {
  registration,
  login,
  findUserByEmail,
};
