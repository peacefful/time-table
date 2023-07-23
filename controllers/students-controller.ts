import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express"
import { IStudents } from "../interfaces/students"

const prisma = new PrismaClient()

export const getStudents = async (req: Request, res: Response):Promise<void> => {
	try {
		const students = await prisma.students.findMany({
			include: {
				timeTable: true
			}
		})
		res.send(students)
	} catch (error) {
		console.log(error);
	}
}

export const addStudent = async (req: Request, res: Response):Promise<void> => {
	try {
		const { name, surname, password, studentId }:IStudents = req.body
		const students = await prisma.students.create({
			data: {
				name,
				surname,
				password,
				studentId,
			}
		})
		res.send(students)
	} catch (error) {
		console.log(error);
	}
}

export const deleteStudent = async (req: Request, res: Response):Promise<void> => {
	try {
		const id:number = parseInt(req.params.id)
		const students = await prisma.students.delete({
			where: {
				id
			}
		})
		res.send(students)
	} catch (error) {
		console.log(error);
	}
}

export const changeStudent = async (req: Request, res: Response):Promise<void> => {
	try {
		const id:number = parseInt(req.params.id)
		const { name, surname, password, studentId }:IStudents = req.body
		const students = await prisma.students.update({
			where: {
				id
			},
			data: {
				name, 
				surname,
				password,
				studentId
			}
		})
		res.send(students)
	} catch (error) {
		console.log(error);
	}
}
