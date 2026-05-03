const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const seedData = require("./seed");

dotenv.config();

const runSeed = async () => {
  await connectDB();
  await seedData();
  console.log("Seeding complete. Exiting...");
  process.exit(0);
};

runSeed();
