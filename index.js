require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const router = require("./router/index");

const app = express();
const PORT = process.env.PORT || 5000;

// Настройка CORS
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json()); // Подключаем express.json после CORS
app.use("/api", router); // Подключаем маршруты после настройки CORS

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log("server started on port", PORT));
  } catch (error) {
    console.log(error);
  }
};

start();
