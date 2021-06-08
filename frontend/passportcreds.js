const passport=require('passport');

const googleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user,done){
    done(null,user);
});

passport.deserializeUser(function(user,done){
    done(null,user);
})

passport.use( new googleStrategy({
    clientID:'1048286227272-dampl0tkjidefhqc6u0scnfbu02oqhmt.apps.googleusercontent.com',
    clientSecret:'kT4Bjjsxy5QCU5cF4ytwTM6m',
    callbackURL: 'http://localhost:3000/google/callback',
    passReqToCallback:true},
    function(request,accessToken,refreshToken,profile,done){
        console.log(profile);
        return done(null,profile);
    }
))