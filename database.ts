import mongoose, { mongo } from "mongoose";
import { mongoDBURL } from "./config";

export const connectDatabase = (): Promise<typeof mongoose> => {
  return mongoose
    .connect(mongoDBURL)
    .then(() => {
      console.log("Connected to MongoDB");
      return mongoose;
    })
    .catch((error) => {
      console.error("Error conecting to MongoDB:", error);
      process.exit(1);
    });
};
