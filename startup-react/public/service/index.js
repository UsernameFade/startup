const express = require('express');
const app = express();
let scores = [];
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

const Story = "";
const users = [];
let apiRouter = express.Router();

app.use(`/api`, apiRouter);
app.use(express.json());
app.use(cookieParser());



token: uuid.v4();

app.get('*', (_req, res) => {
  res.send({msg:"Error"});
});


apiRouter.get('/story', (req, res) => {
  res.send({msg:Story});
});



//Most is this code is from the login page on github.

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
  };

  users.push(user);

  return user;
}

function getUser(field, value) {
  if (value) {
    return users.find((user) => user[field] === value);
  }
  return null;
}


app.post('/api/auth', async (req, res) => {
  if (await getUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user);

    res.send({ email: user.email });
  }
});

app.put('/api/auth', async (req, res) => {
  const user = await getUser('email', req.body.email);
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    setAuthCookie(res, user);

    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

app.delete('/api/auth', async (req, res) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);
  if (user) {
    clearAuthCookie(res, user);
  }

  res.send({});
});

app.get('/api/user/me', async (req, res) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);
  if (user) {
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});



async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
  };

  users.push(user);

  return user;
}

async function getUser(field, value) {
  if (value) {
    return users.find((user) => user[field] === value);
  }
  return null;
}

function setAuthCookie(res, user) {
  user.token = uuid.v4();

  res.cookie('token', user.token, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

function clearAuthCookie(res, user) {
  delete user.token;
  res.clearCookie('token');
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

