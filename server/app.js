require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const router = require('./routes');
const { db } = require('./models');
const app = express();

// cors
app.use(cors());

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static
app.use(express.static(path.join(__dirname, '..', 'public')));

// Logging
app.use(logger('dev'));

// Routing
app.use('/api', router);
// 400
app.use((req, res, next) => {
  res.send('something went wrong');
});
// 500
app.use((err, req, res, next) => {
  res.send(err);
});

// Sync and start server
const PORT = 3000;
(async () => {
  await db.sync();
  app.listen(PORT, () => {
    console.log('App start');
  });
})();
