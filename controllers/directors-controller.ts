import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { IDirector } from "../interfaces/director"

const prisma = new PrismaClient()

export const getDirectors = async (req: Request, res: Response):Promise<void> => {
	try {
		const directors = await prisma.director.findMany({
			include: {
				groups: true
			}
		})
		res.send(directors)
	} catch (error) {
		console.log(error);
	}
}

export const addDirector = async (req: Request, res: Response):Promise<void> => {
	try {
		const { name, surname, password, directorId }:IDirector = req.body
		const directors = await prisma.director.create({
			data: {
				name,
				surname,
				password,
				directorId
			}
		})
		res.send(directors)
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
		const id:number = parseInt(req.params.id)
		const { name, surname, password, directorId }:IDirector = req.body
		const director = await prisma.director.update({
			where: {
				id
			},
			data: {
				name,
				surname,
				password,
				directorId,
			}
		})
		res.send(director)
	} catch (error) {
		console.log(error);
	}
}