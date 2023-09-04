import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { IWeekday } from '../../interfaces/weekday'

const prisma = new PrismaClient()

export const getSubjectsOnMonday = async (req: Request, res: Response): Promise<void> => {
  try {
    const subjectsOnMonday = await prisma.monday.findMany()
    res.json(subjectsOnMonday)
  } catch (error) {
    console.log(error)
  }
}

export const addSubjectOnMonday = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: IWeekday = req.body
    const subjectsOnMonday = await prisma.monday.createMany({
      data: {
        ...data
      },
      skipDuplicates: true
    })
    res.json(subjectsOnMonday)
  } catch (error) {
    console.log(error)
  }
}

export const deleteSubjectOnMonday = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id)
    const subjectsOnMonday = await prisma.monday.delete({
      where: {
        id
      }
    })
    res.json(subjectsOnMonday)
  } catch (error) {
    console.log(error)
  }
}

export const changeSubjectOnMonday = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id)
    const data: IWeekday = req.body
    const subjectsOnMonday = await prisma.monday.update({
      where: {
        id
      },
      data: {
        ...data
      }
    })
    res.json(subjectsOnMonday)
  } catch (error) {
    console.log(error)
  }
}
