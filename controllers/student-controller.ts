import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express"
import { IStudent } from "../interfaces/student"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { hashPassword } from "../utils/hashPasword"
import { validationResult } from "express-validator";
import { keyJwt } from "../config/key";

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
			const { name, surname, password, groupId, role, userId }:IStudent = req.body
			const hashedPassword:string = await hashPassword(password);
			const students = await prisma.students.create({
				data: {
					name,
					surname,
					password: hashedPassword,
					groupId,
					userId,
					role
				}
			})
			res.send(students)
		}
	} catch (error) {
		console.log(error);
	}
}

export const checkStudent = async (req: Request, res: Response): Promise<void> => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		} else {
			const { surname, password, role }: IStudent = req.body;
			const student = await prisma.students.findFirst({
				where: {
					surname,
					role
				},
			});

			if (student) {
				const passwordMatch = await bcrypt.compare(password, student.password);
				if (passwordMatch) {
					const token = jwt.sign({
						name: student.name,
						surname: student.surname,
						password: student.password,
						studentId: student.id,
						role: student.role
					}, keyJwt, { expiresIn: 60 * 60 })
					res.status(200).json({token: `Bearer ${token}`, id: student.id});
				} else {
					res.status(401).json({ message: 'Invalid credentials' });
				}
			} else {
				res.status(404).json({ message: 'User not found' });
			}
		}
	} catch (error) {
		console.log(error);
	}
};

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
			const { name, surname, password, groupId, role }:IStudent = req.body
			const students = await prisma.students.update({
				where: {
					id
				},
				data: {
					name, 
					surname,
					groupId,
					role
				}
			})
			res.send(students)
		}
	} catch (error) {
		console.log(error);
	}
}

export const updateGroupId = async (req: Request, res: Response):Promise<void> => {
	try {
		const id:number = parseInt(req.params.id)
		const { groupId }:IStudent = req.body
		const students = await prisma.students.update({
			where: {
				id
			},
			data: {
				groupId,
			}
		})
		res.send(students)
	} catch (error) {
		console.log(error);
	}
}

//Изменить пароль
// export const updatePassword = async (req: Request, res: Response):Promise<void> => {
// 	try {
// 		const id:number = parseInt(req.params.id)
// 		const { password }:IStudent = req.body
// 		const hashedPassword:string = await hashPassword(password);
// 		const students = await prisma.students.update({
// 			where: {
// 				id
// 			},
// 			data: {
// 				password: hashedPassword,
// 			}
// 		})
// 		res.send(students)
// 	} catch (error) {
// 		console.log(error);
// 	}
// }