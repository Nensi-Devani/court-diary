const mongoose = require("mongoose");
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;
    
    // For development/testing environments or if connection fails, use memory server
    if (process.env.NODE_ENV === 'development' || !uri) {
      console.log('Starting MongoDB Memory Server...');
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log(`MongoDB Memory Server started at: ${uri}`);
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // If it fails, try one last time with memory server if we didn't already
    try {
      console.log('Attempting fallback to MongoDB Memory Server...');
      const mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      await mongoose.connect(uri);
      console.log(`MongoDB Connected to Memory Server: ${uri}`);
    } catch (innerError) {
      console.error(`Fallback failed: ${innerError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
