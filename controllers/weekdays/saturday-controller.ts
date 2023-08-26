import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { IWeekday } from "../../interfaces/weekday";

const prisma = new PrismaClient()

export const getSubjectsOnSaturday = async (req:Request, res: Response):Promise<void> => {
	try {
		const subjectsOnSaturday = await prisma.saturday.findMany()
		res.json(subjectsOnSaturday)
	} catch (error) {
		console.log(error);
	}
}

export const addSubjectOnSaturday = async (req:Request, res: Response):Promise<void> => {
	try {
		const data:IWeekday = req.body
		const subjectsOnSaturday = await prisma.saturday.createMany({
			data: {
				...data
			},
			skipDuplicates: true
		})
		res.json(subjectsOnSaturday)
	} catch (error) {
		console.log(error);
	}
}

export const deleteSubjectOnSaturday = async (req:Request, res: Response):Promise<void> => {
	try {
		const id:number = parseInt(req.params.id)
		const subjectsOnSaturday = await prisma.saturday.delete({
			where: {
				id
			}
		})
		res.json(subjectsOnSaturday)
	} catch (error) {
		console.log(error);
	}
}

export const changeSubjectOnSaturday = async (req:Request, res: Response):Promise<void> => {
	try {
		const id:number = parseInt(req.params.id)
		const data:IWeekday = req.body
		const subjectsOnSaturday = await prisma.saturday.update({
			where: {
				id
			},
			data: {
				...data
			}
		})
		res.json(subjectsOnSaturday)
	} catch (error) {
		console.log(error);
	}
}