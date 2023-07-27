import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express"
import { IInstitution } from "../interfaces/institution"

import { validationResult } from "express-validator"

const prisma = new PrismaClient()

export const getInstitutions = async (req: Request, res: Response):Promise<void> => {
	try {
		const institutions = await prisma.institution.findMany({
			include: {
				tutors: true
			}
		})
		res.json(institutions)
	} catch (error) {
		console.log(error);
	}
}

export const addInstitutions = async (req: Request, res: Response):Promise<void> => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() })
		} else {
			const { appellation, directorId }:IInstitution = req.body
			const institutions = await prisma.institution.create({
				data: {
					appellation,
					directorId
				}
			})
		res.json(institutions)
		}
	} catch (error) {
		console.log(error);
	}
}

export const deleteInstitution = async (req: Request, res: Response):Promise<void> => {
	try {
		const id:number = parseInt(req.params.id)
		const institutions = await prisma.institution.delete({
			where: {
				id
			}
		})
		res.json(institutions)
	} catch (error) {
		console.log(error);
	}
}

export const changeInstitution = async (req: Request, res: Response):Promise<void> => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() })
		} else {
			const id:number = parseInt(req.params.id)
			const { appellation, directorId }:IInstitution = req.body
			const institutions = await prisma.institution.update({
				where: {
					id
				},
				data: {
					appellation,
					directorId
				}
			})
			res.json(institutions)
		}
	} catch (error) {
		console.log(error);
	}
}