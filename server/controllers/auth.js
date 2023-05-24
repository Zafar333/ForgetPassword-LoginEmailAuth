import { User } from "../models/users.js";
import { ErrorResponse } from "../utils/errorResponse.js";
export const register = async (req, res, next) => {
  const { username, password, email } = req.body;
  // register code is start here
  try {
    const user = await User.create({ username, email, password });
    res.json({
      status: 200,
      success: true,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
// login code is start
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("please provide an email and address", 400));
  } else {
    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
      const ismatch = await user.matchPasswords(password);
      if (!ismatch) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
      res.json({ status: 200, success: true, token: "64387ejkwdjnk" });
    } catch (error) {
      next(error);
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
