const express = require('express'); 
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const userRouter = require('./users/userRouter.js');
const notesRouter = require('./notes/noteRouter.js');

const server = express();
server.use(cors({}));
server.use(express.json());

server.use('/api/users', userRouter);
server.use('/api/notes', notesRouter);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running', server: `Server up and running on ${port}` });
});

const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect(`${process.env.mongo}`, {}, err => {
  if (err) console.log(err);
  console.log('Mongoose connected us to our DB');
});

server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});