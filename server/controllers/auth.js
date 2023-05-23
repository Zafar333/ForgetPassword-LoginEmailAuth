import { User } from "../models/users.js";
export const register = async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res.json({
      status: 200,
      success: true,
      user: user,
    });
  } catch (error) {
    res.json({ success: false, status: 500, msg: error.message });
  }
};
// login code is start
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.json({
      success: false,
      status: 400,
      msg: "please provide email and password",
    });
  } else {
    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        res.json({ status: 404, msg: "Invalid credidentials", success: false });
      }
      const ismatch = await user.matchPasswords(password);
      if (!ismatch) {
        res.json({
          success: false,
          status: 400,
          msg: "Your password is incorrect",
        });
      }
      res.json({ status: 200, success: true, token: "64387ejkwdjnk" });
    } catch (error) {
      res.json({ success: false, status: 500, msg: error.message });
    }
  }
};
// login code end

export const forgotPassword = (req, res, next) => {
  res.json("Forgot Password route");
};

export const resetPassword = (req, res, next) => {
  res.json("Reset Password route");
};
