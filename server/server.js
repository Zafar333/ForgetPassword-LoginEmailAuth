import express from "express";
import dotenv from "dotenv";
import { database } from "../server/config/db.js";
import router from "../server/routes/auth.js";
dotenv.config();
database();
const app = express();
app.use(express.json());
app.use("/api/auth", router());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
// this process function is tell the error in small message
// process.on("unhandledRejection", (err, promise) => {
//   console.log(`logged error:${err}`);
//   server.close(() => process.exit(1));
// });
