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

export const studentPassport = () => {
	passport.use(new JwtStrategy(JwtOptions, async (payload, done) => {
		try {
			const student = await prisma.students.findUnique({
				where: {
					id: payload.studentId
				}
			})
			if (student) {
				return done(null, student);
			} else {
				return done(null, false);
			}
		} catch (error) {
			return done(error, false);
		}
	}))
}