import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express"
import { IStudent } from "../interfaces/student"

import { validationResult } from "express-validator";

const prisma = new PrismaClient()

export const getStudents = async (req: Request, res: Response):Promise<void> => {
	try {
		const students = await prisma.students.findMany()
		res.send(students)
	} catch (error) {
		console.log(error);
	}
}

export const addStudent = async (req: Request, res: Response):Promise<void> => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() })
		} else {
			const { name, surname, password, timeTableId }:IStudent = req.body
			const students = await prisma.students.create({
				data: {
					name,
					surname,
					password,
					timeTableId,
				}
			})
			res.send(students)
		}
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
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() })
		} else {
			const id:number = parseInt(req.params.id)
			const { name, surname, password, timeTableId }:IStudent = req.body
			const students = await prisma.students.update({
				where: {
					id
				},
				data: {
					name, 
					surname,
					password,
					timeTableId
				}
			})
			res.send(students)
		}
	} catch (error) {
		console.log(error);
	}
}
