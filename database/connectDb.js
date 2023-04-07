const mongoose = require('mongoose');
const DB_URL = require('../App/Config/env').db_url;
const connectDb = () => {
    mongoose
        .connect(DB_URL, { useNewUrlParser: true })
        .then(() => console.log('DATABASE CONNECTED'))
        .catch((err) => console.log('DB FAILED: ', err.message));
};

module.exports = connectDb;
