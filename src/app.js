require("dotenv").config();
const express = require("express");
const app = express();
const database = require("./classes/database");
const indexRouter = require("./routes/index");

// Database connectivity
database.connect();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use("/api", indexRouter);

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ status: "error", message: err.message });
});

module.exports = app;
