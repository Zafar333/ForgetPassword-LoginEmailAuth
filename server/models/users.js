import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "plese provide a username"],
  },
  email: {
    type: String,
    required: [true, "please provide a email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "please add user password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
// this function is for password encryption start
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// this function is for password encryption end

// this function is for comparing password start

userSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};
// this function is for comparing password encryption end

// this function is for generate jwt token start

userSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECERET);
};

export const User = mongoose.model("User", userSchema);
