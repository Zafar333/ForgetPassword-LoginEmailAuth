import { ErrorResponse } from "../utils/errorResponse.js";

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err?.message;

  if (err?.code == 1100) {
    const message = "duplicate field value enter";
    error = new ErrorResponse(message, 400);
  }
  if (err?.name == "ValidationError") {
    const message = object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }
  res
    .status(error.statusCode || 500)
    .json({ sucess: false, error: error.message || "server error" });
};
