import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnection = async () => {
  try {
    const dbURI = process.env.DBURL as string; 

    if (!dbURI) {
      throw new Error("MONGO_URI is not defined in the environment variables.");
    }

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Error while connecting to the database:", error);
    process.exit(1); 
  }
};
