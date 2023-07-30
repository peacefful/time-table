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

export const directorPassport = () => {
	passport.use(new JwtStrategy(JwtOptions, async (payload, done) => {
		try {
			const director = await prisma.director.findUnique({
				where: {
					id: payload.directorId
				}
			})
			if (director) {
				return done(null, director);
			} else {
				return done(null, false);
			}
		} catch (error) {
			return done(error, false);
		}
	}))
}