const express = require('express');
const app = express();
let scores = [];
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

let Story = "";
let apiRouter = express.Router();

app.use(`/api`, apiRouter);
app.use(express.json());


app.get('*', (_req, res) => {
  res.send({msg:"Again"});
});


apiRouter.get('/story', (_req, res) => {
  res.send({msg:Story});
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});