import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { IWeekday } from '../../interfaces/weekday'

const prisma = new PrismaClient()

export const getSubjectsOnWednesday = async (req: Request, res: Response): Promise<void> => {
  try {
    const subjectsOnWednesday = await prisma.wednesday.findMany()
    res.json(subjectsOnWednesday)
  } catch (error) {
    console.log(error)
  }
}

export const addSubjectsOnWednesday = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: IWeekday = req.body
    const subjectsOnWednesday = await prisma.wednesday.createMany({
      data: {
        ...data
      },
      skipDuplicates: true
    })
    res.json(subjectsOnWednesday)
  } catch (error) {
    console.log(error)
  }
}

export const deleteSubjectsOnWednesday = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id)
    const subjectsOnWednesday = await prisma.wednesday.delete({
      where: {
        id
      }
    })
    res.json(subjectsOnWednesday)
  } catch (error) {
    console.log(error)
  }
}

export const changeSubjectsOnWednesday = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id)
    const data: IWeekday = req.body
    const subjectsOnWednesday = await prisma.wednesday.update({
      where: {
        id
      },
      data: {
        ...data
      }
    })
    res.json(subjectsOnWednesday)
  } catch (error) {
    console.log(error)
  }
}
