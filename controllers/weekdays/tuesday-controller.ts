import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { IWeekday } from '../../interfaces/weekday'

const prisma = new PrismaClient()

export const getSubjectsOnTuesday = async (req: Request, res: Response): Promise<void> => {
  try {
    const subjectsOnTuesday = await prisma.tuesday.findMany()
    res.json(subjectsOnTuesday)
  } catch (error) {
    console.log(error)
  }
}

export const addSubjectsOnTuesday = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: IWeekday = req.body
    const subjectsOnTuesday = await prisma.tuesday.createMany({
      data: {
        ...data
      },
      skipDuplicates: true
    })
    res.json(subjectsOnTuesday)
  } catch (error) {
    console.log(error)
  }
}

export const deleteSubjectsOnTuesday = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id)
    const subjectsOnTuesday = await prisma.tuesday.delete({
      where: {
        id
      }
    })
    res.json(subjectsOnTuesday)
  } catch (error) {
    console.log(error)
  }
}

export const changeSubjectsOnTuesday = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id)
    const data: IWeekday = req.body
    const subjectsOnTuesday = await prisma.tuesday.update({
      where: {
        id
      },
      data: {
        ...data
      }
    })
    res.json(subjectsOnTuesday)
  } catch (error) {
    console.log(error)
  }
}
