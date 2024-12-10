import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Ensure MONGODB_URI is correctly formatted in .env
// if (!process.env.MONGODB_URI) {
//   throw new Error("Please provide MONGODB_URI in the .env file");
// }

async function connectDB() {
  try {
    const uri = `mongodb+srv://ngoctan1811:e6koGzP41PD9VwsX@mern.loh6o.mongodb.net/?retryWrites=true&w=majority&appName=MERN`;

    await mongoose.connect(uri);

    console.log("Connected to DB");
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  }
}

export default connectDB;
