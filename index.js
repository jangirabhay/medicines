const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/medicines',require('./api/medicines'));


module.exports = app;