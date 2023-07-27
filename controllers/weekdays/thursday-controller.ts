import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { IWeekday } from "../../interfaces/weekday";

const prisma = new PrismaClient()

export const getSubjectsOnThursday = async (req:Request, res: Response):Promise<void> => {
	try {
		const subjectsOnThursday = await prisma.thursday.findMany()
		res.json(subjectsOnThursday)
	} catch (error) {
		console.log(error);
	}
}

export const addSubjectsOnThursday = async (req:Request, res: Response):Promise<void> => {
	try {
		const data:IWeekday = req.body
		const subjectsOnThursday = await prisma.thursday.create({
			data: {
				...data
			}
		})
		res.json(subjectsOnThursday)
	} catch (error) {
		console.log(error);
	}
}

export const deleteSubjectsOnThursday = async (req:Request, res: Response):Promise<void> => {
	try {
		const id:number = parseInt(req.params.id)
		const subjectsOnThursday = await prisma.thursday.delete({
			where: {
				id
			}
		})
		res.json(subjectsOnThursday)
	} catch (error) {
		console.log(error);
	}
}

export const changeSubjectsOnThursday = async (req:Request, res: Response):Promise<void> => {
	try {
		const id:number = parseInt(req.params.id)
		const data:IWeekday = req.body
		const subjectsOnThursday = await prisma.thursday.update({
			where: {
				id
			},
			data: {
				...data
			}
		})
		res.json(subjectsOnThursday)
	} catch (error) {
		console.log(error);
	}
}