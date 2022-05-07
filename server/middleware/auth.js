const GoogleStrategy = require('passport-google-oauth2').Strategy;
const dotenv = require('dotenv')

dotenv.config()

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        return done(err, profile);
    }
));