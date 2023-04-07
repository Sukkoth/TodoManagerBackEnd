const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./database/connectDb');
const APP_PORT = require('./App/Config/env').app_port;
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const errorHanlder = require('./App/Middlewares/errorHandler');

connectDb();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/v1/todos', require('./routes/todoRoutes'));

app.use(errorHanlder);
app.listen(APP_PORT, () => console.log(`Server running on ${APP_PORT}`));
