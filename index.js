require('dotenv').config();
const mongoose = require('mongoose');

const express = require('express');
const cors = require('cors');

const router = require('./router/index');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', router);
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log('server started'));
  } catch (error) {
    console.log(error);
  }
};

start();
