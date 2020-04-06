const db = require("Server//models");
const User = db.users;
const Op = db.Sequelize.Op;

 var JwtStrategy = require('passport-jwt').Strategy,
 ExtractJwt = require('passport-jwt').ExtractJwt;
 
module.exports = (passport)=>{ 
    var opts = {}
    opts.secretOrKey = 'secret';
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();    
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
};