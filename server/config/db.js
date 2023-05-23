import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const database = async () => {
  mongoose.set("strictQuery", true);

  await mongoose.connect(process.env.MONGODB_URL, {
    // useNewUrlParser: true,
    // // useCreateIndex: true,
    // useUnifiedTopology: true,
    // // useFindAndModified: true,
  });
  console.log("i am database connected");
};
