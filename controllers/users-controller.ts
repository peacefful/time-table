import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { IUser } from "../interfaces/user"

const prisma = new PrismaClient()

export const getUsers = async (req: Request, res: Response):Promise<void> => {
	try {
		const users = await prisma.users.findMany({
			include: {
				students: true,
				tutors: true
			}
		})
		res.send(users)
	} catch (error) {
		console.log(error);
	}
}

export const addUsers = async (req: Request, res: Response):Promise<void> => {
	try {
		const { name, institutionId }:IUser = req.body
		const users = await prisma.users.create({
			data: {
				name: "Учащиеся",
				institutionId
			}
		})
		res.send(users)
	} catch (error) {
		console.log(error);
	}
}