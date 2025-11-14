const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');



const authCookieName = 'token';
var Story = "The Story Began With...";

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(cookieParser());
app.use(express.static('public'));



app.use(express.json());
var apiRouter = express.Router();
app.use(`/api`, apiRouter);



app.use((_req, res) => {
  res.sendFile('index.html', {root: 'public' });

});


app.get('*', (_req, res) => {
  res.send({msg:"Error"});
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});


apiRouter.get('/story', (req, res) => {
  res.send({msg:Story});
});

//Test Command: 
// curl -X POST http://localhost:4000/api/auth/create -H "Content-Type: application/json; charset=UTF-8" -d '{"email":"testEmail.com", "password":"testPassword"}'

apiRouter.post('/auth/create', async (req, res) => {

  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Username Taken' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
          user.token = uuid.v4();
      setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
    
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
          user.token = uuid.v4();
          await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    DB.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user);


  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

apiRouter.post('/story' ,verifyAuth, async (req, res) => {
  Story=Story+"\n"+req.body.msg;
  DB.updateStory({msg:Story});
  res.send({msg:Story});
  
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });

}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});



