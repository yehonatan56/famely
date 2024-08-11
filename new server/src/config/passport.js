const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require("bcrypt");
const {FamelyModel} = require("../models/famely");


passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'pass'
} , async function verify(name, password, cb) {
    const user = await FamelyModel.findOne({name});
    await bcrypt.compare(password , user.pass , (err, result) => {
        return result ? cb(null,user) : cb(null,false)
    })
}));
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});