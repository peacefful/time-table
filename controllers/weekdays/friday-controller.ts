import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { IWeekday } from "../../interfaces/weekday";

const prisma = new PrismaClient()

export const getSubjectsOnFriday = async (req:Request, res: Response):Promise<void> => {
	try {
		const subjectsOnFriday = await prisma.friday.findMany()
		res.json(subjectsOnFriday)
	} catch (error) {
		console.log(error);
	}
}

export const addSubjectsOnFriday = async (req:Request, res: Response):Promise<void> => {
	try {
		const data:IWeekday = req.body
		const subjectsOnFriday = await prisma.friday.createMany({
			data: {
				...data
			},
			skipDuplicates: true
		})
		res.json(subjectsOnFriday)
	} catch (error) {
		console.log(error);
	}
}

export const deleteSubjectsOnFriday = async (req:Request, res: Response):Promise<void> => {
	try {
		const id:number = parseInt(req.params.id)
		const subjectsOnThursday = await prisma.friday.delete({
			where: {
				id
			}
		})
		res.json(subjectsOnThursday)
	} catch (error) {
		console.log(error);
	}
}

export const changeSubjectsOnFriday = async (req:Request, res: Response):Promise<void> => {
	try {
		const id:number = parseInt(req.params.id)
		const data:IWeekday = req.body
		const subjectsOnFriday = await prisma.friday.update({
			where: {
				id
			},
			data: {
				...data
			}
		})
		res.json(subjectsOnFriday)
	} catch (error) {
		console.log(error);
	}
}