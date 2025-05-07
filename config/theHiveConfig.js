const axios = require('axios');
require('dotenv').config();

const theHiveClient = axios.create({
  baseURL: process.env.THE_HIVE_URL,
  headers: {
    'Authorization': `Bearer ${process.env.THE_HIVE_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

module.exports = theHiveClient;