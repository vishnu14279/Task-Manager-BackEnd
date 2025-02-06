const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http'); // Import http
dotenv.config({
  path: './.env'
});

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION!!! shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');
const server = http.createServer(app);
const database = process.env.DATABASE

mongoose.connect(database).then(con => {
  console.log('DB connection Successfully!');
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION!!!  shutting down ...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});