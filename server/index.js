require('dotenv').config();

const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      authCtrl = require('./controllers/authController'),
      postCtrl = require('./controllers/postController'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      app = express()


app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
}))

app.post('/auth/register', authCtrl.createUser);
app.post('/auth/login', authCtrl.loginUser);
app.get('/auth/logout', authCtrl.logoutUser);
app.get('/auth/me', authCtrl.checkLogin)

app.get('/api/posts', postCtrl.getFilteredPosts);
app.get('/api/posts/:id', postCtrl.getPost);
app.post('/api/posts', postCtrl.createPost);
app.delete('/api/posts/:id', postCtrl.deletePost);

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log("DATABASE CONNECTED")
}).catch(err => console.log(err))


app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`))

