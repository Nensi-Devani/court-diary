const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const connectDB = require("./config/db");

dotenv.config();

const addLawyer = async () => {
  await connectDB();
  
  const existingUser = await User.findOne({ email: "devaninensi13@gmail.com" });
  if (existingUser) {
    console.log("User already exists!");
    process.exit(0);
  }

  const user = await User.create({
    name: "Nensi Devani",
    email: "devaninensi13@gmail.com",
    password: "password123",
    role: "lawyer",
    isVerified: true,
    phone: "1234567890",
    office: {
      name: "Devani Law",
      email: "devani.office@gmail.com",
      address: "India",
      phone: "1234567890"
    }
  });

  console.log("Added lawyer:", user.email);
  process.exit(0);
};

addLawyer();
