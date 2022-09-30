var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
   const passport = require ("passport");
const User = require('../models/User');
var opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
secretOrKey : process.env.SecretOrKey,
}


passport.use(
    new JwtStrategy(opts, async (jwt_payload, done)=>{
        try {
            const user = await User.findOne({_id: jwt_payload._id}).select("-password");
            user ? done(null, user) : done(null, false);
        } catch (error) {
            console.log(error);
        }
    })
);

module.exports= isAuth =() =>
passport.authenticate("jwt", {session:false});