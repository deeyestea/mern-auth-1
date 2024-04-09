import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
const User = mongoose.model("users");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;

const passportConfig = (passport) => {
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

export default passportConfig;