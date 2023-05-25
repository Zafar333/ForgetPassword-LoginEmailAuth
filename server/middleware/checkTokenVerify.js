import jwt from "jsonwebtoken";
import { ErrorResponse } from "../utils/errorResponse.js";
import { User } from "../models/users.js";
export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECERET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse());
    }
  } catch {}
};
