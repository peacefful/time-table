import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { ITutor } from "../interfaces/tutor"

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
			const tutors = await prisma.tutor.create({
				data: {
					name,
					surname,
					password,
					institutionId
				}
			})
			res.send(tutors)
		}
	} catch (error) {
		console.log(error);
	}
}

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
			const tutors = await prisma.tutor.update({
				where: {
					id
				},
				data: {
					name,
					surname,
					password,
					institutionId
				}
			})
			res.send(tutors)
		}
	} catch (error) {
		console.log(error);
	}
}