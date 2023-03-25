const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// Allow cross-origin resource sharing (CORS)
app.use(cors());
app.use(express.json());