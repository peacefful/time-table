import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { ITimeTable } from "../interfaces/TimeTable"

const prisma = new PrismaClient()

export const getTimeTable = async (req: Request, res: Response):Promise<void> => {
	try {
		const timeTable = await prisma.timeTable.findMany({
			include: {
				monday: true,
				tuesday: true,
				wednesday: true,
				thursday: true,
				friday: true,
				saturday: true
			}
		})
		res.json(timeTable)
	} catch (error) {
		console.log(error);
	}
}

export const createTimeTable = async (req: Request, res: Response):Promise<void> => {
	try {
		const { groupId }:ITimeTable = req.body
		const timeTable = await prisma.timeTable.create({
			data: {
				groupId
			}
		})
		res.json(timeTable)
	} catch (error) {
		console.log(error);
	}
}

export const deleteTimeTable = async (req: Request, res: Response):Promise<void> => {
	try {
		const id:number = parseInt(req.params.id)
		const timeTable = await prisma.timeTable.delete({
			where: {
				id
			}
		})
		res.json(timeTable)
	} catch (error) {
		console.log(error);
	}
}

export const changeTimeTable = async (req: Request, res: Response):Promise<void> => {
	try {
		const id:number = parseInt(req.params.id)
		const { groupId }:ITimeTable = req.body
		const timeTable = await prisma.timeTable.update({
			where: {
				id
			},
			data: {
				groupId
			}
		})
		res.json(timeTable)
	} catch (error) {
		console.log(error);
	}
}