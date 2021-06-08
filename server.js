const express = require('express');
const passport = require('passport');
const cookieSession=require('cookie-session');
const mongoose = require('mongoose');
const { urlencoded, json } = require('express');
const connectionString="mongodb+srv://deepaknad:"+"Deepak4D6"+"@cluster0.vkpay.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; 
require('./frontend/passportcreds');
const app = express();

app.engine('html', require('ejs').renderFile);
app.use(express.static('frontend'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use(cookieSession({
    name:'login_session',
    keys:['im','in']

}))

mongoose.connect(connectionString, { useUnifiedTopology: true, useNewUrlParser: true }).catch(err => console.error(err));

mongoose.connection.on('connected',function(){
    console.log("DataBase connection established");
})

mongoose.connection.on('connecting',function(){
    console.log("DB connecting");
})

let users = [
        {
            username:'user1',
            email:'user1@g.com',
            password:'test1'
        },
        {
            username:'user2',
            email:'user2@g.com',
            password:'test2'
        }
]

app.get('/fail',(req,res)=>{
    res.send("Login failed :(");
})

app.get('/success',(req,res)=>{
    console.log(req.user)
    res.render(__dirname + "/frontend/page.html");
})
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/frontend/login.html");
})

app.post('/login',(res,req)=>{
    
})

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback',passport.authenticate('google',{failureRedirect:'/fail'}),
    function(req,res){
        res.redirect('/success');
    }
)
console.log(users);
app.post('/register',(req,res)=>{
    
    console.log(req.body);
    users.push(req.body);
    console.log(users);
    res.redirect('/');
})

app.get('/signup',(req,res)=>{
    res.sendFile(__dirname+'/frontend/register.html');
})

app.get('/logout',(req,res)=>{
    req.session=null;
    req.logout();
    res.redirect('/');
})


app.listen(3000,function(){
    console.log("server started at localhost:3000")
})