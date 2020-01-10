const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey; // this line kept giving me errors than i changed secretOrkey to capital secretOrKey

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {

            User.findById(jwt_payload.id)
            .then(user=>{
                if(user){
                    return done(null,user);
                }
                return done(null, false) // the false was flase and i was not able to post a user
            })
            .catch(err => console.log(err));
            //FIND USER BY THAT ID AND IF AND IT WILL GIVE US A USER 
            /*
            console.log(jwt_payload);
            { id: '5ca5e46d7e94761ee80773e4',
                name: 'Brad Traversy',
                avatar:
                '//www.gravatar.com/avatar/6c809cec0bbec70295c75a6802634202?s=200&r=pg&d=mm',
                iat: 1554791653,
                exp: 1554795253 }
            */
        })
    );
};