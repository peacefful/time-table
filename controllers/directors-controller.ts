import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { IDirector } from "../interfaces/director"

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
			const { name, surname, password }:IDirector = req.body
			const directors = await prisma.director.create({
				data: {
					name,
					surname,
					password
				}
			})
			res.send(directors)
		}
	} catch (error) {
		console.log(error);
	}
}

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
			const { name, surname, password }:IDirector = req.body
			const director = await prisma.director.update({
				where: {
					id
				},
				data: {
					name,
					surname,
					password
				}
			})
			res.send(director)
		}
	} catch (error) {
		console.log(error);
	}
}