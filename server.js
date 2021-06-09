const express = require('express')
const app = express()
const passport = require('passport');
const cookieSession = require('cookie-session')
require('./passport-setup');

app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
}))

app.set('view engine','ejs')

app.engine('html', require('ejs').renderFile);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
      res.sendFile(__dirname+'/frontend/html/login.html')
    }
)
app.get('/fail', (req, res) => res.send('log in failed :('))

app.get('/success',(req, res) =>{
    res.render(__dirname + "/frontend/html/page.html",{name:req.user.displayName,email:req.user.email});
})

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/fail'}),
  function(req, res) {
    res.redirect('/success');
  }
);

app.get('/register',(req,res)=>{
  res.sendFile(__dirname+"/frontend/html/register.html")
})

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

app.listen(3000, () => console.log('server started at localhost:3000'));