const express = require('express')
const session = require('express-session')  //express-session for cookies

const { db, Users ,URL } = require('./db')

//for acquring files from routes folders
const usersRoute = require('./routes/index')
const urlsRoute = require('./routes/URLs')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/users',usersRoute)  ///-> set the path of usersRoute
app.use('/api/hash',urlsRoute)

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'this is hashing',
}))

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/pages/signup.html')
})

app.post('/signup', async (req, res) => {
  const user = await Users.create({
    username: req.body.username,
    password: req.body.password, // NOTE: in production we save hash of password
    email: req.body.email
  })

  res.status(201).send(`User ${user.id} created`)
})

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/pages/login.html')
})

app.post('/login', async (req, res) => {
  const user = await Users.findOne({where: { username: req.body.username }})
  if (!user) {
    return res.sendFile(__dirname + '/pages/login.html')
  }

  if (user.password !== req.body.password) {
    return res.render(__dirname + '/pages/login.html')
  }
  req.session.userId = user.id
 // res.redirect('pages/profile.html')
  res.sendFile(__dirname + '/pages/profile.html')  
})

app.get('/profile', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/pages/login.html')
  }
 // const user = await Users.findByPk(req.session.userId)
  res.sendFile(__dirname + '/pages/profile.html')  //here we are rendering profile page with 
})

app.get('/logout', (req, res) => {
  req.session.userId = null
  res.sendFile(__dirname + '/pages/login.html')
})

db.sync()
  .then(() => {
    app.listen(2222, () => console.log('started on http://localhost:2222/login'))
  })
  .catch(console.error)