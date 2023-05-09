import { APIError } from '@e-comms/shared/errors';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Buyer } from '../../models/users';
import { IRequest, RegisterDTO } from '../../types';
import { createUser, getUserByEmail } from '../userProvider';

passport.use(
    'signup',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req: IRequest<RegisterDTO>, email, password, done) => {
            try {
                const userModel = {
                    email,
                    password,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    address: req.body.address,
                };
                const userExists = await getUserByEmail(email);

                if (userExists) {
                    return done(
                        new APIError(403, {
                            msg: 'User already exits, please login!',
                        }),
                        false
                    );
                }
                const buyer = await createUser(userModel, Buyer);

                return done(null, buyer);
            } catch (error) {
                done(error);
            }
        }
    )
);

export const signUp = () => {
    return passport.authenticate('signup', { session: false });
};
