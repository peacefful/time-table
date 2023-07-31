import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { IDirector } from "../interfaces/director"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { keyJwt } from "../config/key"
import { hashPassword } from "../utils/hashPasword"
import { validationResult } from "express-validator"


const prisma = new PrismaClient()

export const getDirectors = async (req: Request, res: Response):Promise<void> => {
	try {
		const directors = await prisma.director.findMany({
			include: {
				institution: true
			}
		})
		res.send(directors)
	} catch (error) {
		console.log(error);
	}
}

export const addDirector = async (req: Request, res: Response):Promise<void> => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() })
		} else {
			const { name, surname, password, role }:IDirector = req.body
			const hashedPassword:string = await hashPassword(password);
			const directors = await prisma.director.create({
				data: {
					name,
					surname,
					password: hashedPassword,
					role
				}
			})
			res.send(directors)
		}
	} catch (error) {
		console.log(error);
	}
}

export const checkDirector = async (req: Request, res: Response): Promise<void> => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		} else {
			const { surname, password, role }: IDirector = req.body;
			const director = await prisma.director.findFirst({
				where: {
					surname,
					role
				},
			});

			if (director) {
				const passwordMatch = await bcrypt.compare(password, director.password);
				if (passwordMatch) {
					const token = jwt.sign({
						name: director.name,
						surname: director.surname,
						password: director.password,
						role: director.role,
						directorId: director.id
					}, keyJwt, { expiresIn: 10 * 60 })
					res.status(200).json({ token: `Bearer ${token}` });
				} else {
					res.status(401).json({ message: 'Invalid credentials' });
				}
			} else {
				res.status(404).json({ message: 'User not found' });
			}
		}
	} catch (error) {
		console.log(error);
	}
};

export const deleteDirector = async (req: Request, res: Response):Promise<void> => {
	try {
		const id:number = parseInt(req.params.id)
		const director = await prisma.director.delete({
			where: {
				id
			}
		})
		res.send(director)
	} catch (error) {
		console.log(error);
	}
}

export const changeDirector = async (req: Request, res: Response):Promise<void> => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() })
		} else {
			const id:number = parseInt(req.params.id)
			const { name, surname, password, role }:IDirector = req.body
			const hashedPassword:string = await hashPassword(password);
			const directors = await prisma.director.update({
				where: {
					id
				},
				data: {
					name,
					surname,
					password: hashedPassword,
					role
				}
			})
			res.send(directors)
		}
	} catch (error) {
		console.log(error);
	}
}