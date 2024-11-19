import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';

const configurePassport = (app) => {
    app.use(passport.initialize());

    passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([
                    (req) => req?.cookies?.token || null,
                ]),
                secretOrKey: process.env.JWT_SECRET,
            },
            async (jwtPayload, done) => {
                try {
                    const user = await User.findById(jwtPayload.id);
                    if (user) return done(null, user);
                    return done(null, false);
                } catch (error) {
                    return done(error, false);
                }
            }
        )
    );
};

export default configurePassport;
