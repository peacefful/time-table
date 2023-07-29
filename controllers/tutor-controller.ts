import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { ITutor } from "../interfaces/tutor"
import bcrypt from "bcrypt"

import { hashPassword } from "../utils/hashPasword"
import { validationResult } from "express-validator"

const prisma = new PrismaClient()

export const getTutors = async (req: Request, res: Response):Promise<void> => {
	try {
		const tutors = await prisma.tutor.findMany({
			include: {
				groups: true
			}
		})
		res.send(tutors)
	} catch (error) {
		console.log(error);
	}
}

export const addTutor = async (req: Request, res: Response):Promise<void> => {
	try {
		const errors = validationResult(req)
		if(!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() })
		} else {
			const { name, surname, password, institutionId }:ITutor = req.body
			const hashedPassword:string = await hashPassword(password);
			const tutors = await prisma.tutor.create({
				data: {
					name,
					surname,
					password:hashedPassword,
					institutionId
				}
			})
			res.send(tutors)
		}
	} catch (error) {
		console.log(error);
	}
}

export const checkTutor = async (req: Request, res: Response): Promise<void> => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		} else {
			const { surname, password }: ITutor = req.body;
			const tutor = await prisma.tutor.findFirst({
				where: {
					surname
				},
			});

			if (tutor) {
				const passwordMatch = await bcrypt.compare(password, tutor.password);
				if (passwordMatch) {
					res.send(tutor);
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

export const deleteTutor = async (req: Request, res: Response):Promise<void> => {
	try {
		const id:number = parseInt(req.params.id)
		const tutors = await prisma.tutor.delete({
			where: {
				id
			}
		})
		res.send(tutors)
	} catch (error) {
		console.log(error);
	}
}

export const changeTutor = async (req: Request, res: Response):Promise<void> => {
	try {
		const errors = validationResult(req)
		if(!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() })
		} else {
			const id:number = parseInt(req.params.id)
			const { name, surname, password, institutionId }:ITutor = req.body
			const hashedPassword:string = await hashPassword(password);
			const tutors = await prisma.tutor.update({
				where: {
					id
				},
				data: {
					name,
					surname,
					password:hashedPassword,
					institutionId
				}
			})
			res.send(tutors)
		}
	} catch (error) {
		console.log(error);
	}
}