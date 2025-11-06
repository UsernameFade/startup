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
  res.send({msg:"Error"});
});


apiRouter.get('/story', (req, res) => {
  res.send({msg:Story});
});

apiRouter.post('/auth', async (req, res) => {
  res.send({ email: 'test' });
});

apiRouter.put('/auth', async (req, res) => {
  res.send({ email: 'test' });
});

apiRouter.delete('/auth', async (req, res) => {
  res.send({});
});

apiRouter.get('/user', async (req, res) => {
  res.send({ email: 'test' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

