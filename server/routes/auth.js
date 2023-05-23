import express from "express";
const router = express.Router();

import {
  register,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.js";

const route = () => {
  console.log("inside");
  // router.post("/register", register);
  router.route("/register").post(register);
  router.route("/login").post(login);
  router.route("/forgotpassword").post(forgotPassword);
  router.route("/resetpassword/:restToken").put(resetPassword);
  return router;
};
export default route;
