const mongoose = require("mongoose");

class Database {
  constructor() {
    this.DB_USERNAME = process.env.DB_USERNAME;
    this.DB_PASSWORD = process.env.DB_PASSWORD;
    this.DB_NAME = process.env.DB_NAME;
    this.CONNECT_URL = `mongodb+srv://${this.DB_USERNAME}:${this.DB_PASSWORD}@payment-gatway.9ahdyff.mongodb.net/${this.DB_NAME}`;
  }

  async connect() {
    try {
      await mongoose.connect(this.CONNECT_URL, {});
      // console.info("DATABASE CONNECTED SUCCESSFULLY");
    } catch (err) {
      console.error("DATABASE CONNECTION ERROR : ", err.message);
      throw err;
    }
  }

  async close() {
    try {
      await mongoose.connection.close();
      console.info("DATABASE DISCONNECTED SUCCESSFULLY");
    } catch (err) {
      console.error("Error during MongoDB connection closure:", err);
    }
  }
}

module.exports = new Database();
