import passportJWT from "passport-jwt"
import passport from "passport"

import { keyJwt } from "../../config/key"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt

const JwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keyJwt
}

export const tutorPassport = () => {
	passport.use(new JwtStrategy(JwtOptions, async (payload, done) => {
		try {
			const tutor = await prisma.tutor.findUnique({
				where: {
					id: payload.tutorId
				}
			})
			if (tutor) {
				return done(null, tutor);
			} else {
				return done(null, false);
			}
		} catch (error) {
			return done(error, false);
		}
	}))
}