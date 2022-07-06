const {
  registration,
  login,
  findUserByEmail,
} = require("../services/authServices");

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (user) {
    res.status(409).json({
      message: "Email in use",
    });
  }
  await registration({ email, password });

  res.status(200).json({
    user: {
      email,
      subscription: "starter",
    },
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const token = await login({ email, password });
  if (!token) {
    res.status(401).json({
      message: "Email or password is wrong",
    });
  }
  res.status(200).json({
    token,
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = {
  registrationController,
  loginController,
};
