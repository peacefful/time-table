import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { IGroup } from '../interfaces/group'

const prisma = new PrismaClient()

export const getGroups = async (req: Request, res: Response): Promise<void> => {
  try {
    const groups = await prisma.groups.findMany({
      include: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        tutors: true,
        students: true
      }
    })
    res.send(groups)
  } catch (error) {
    console.log(error)
  }
}

export const addGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { groupName, course, institutionId }: IGroup = req.body
    const newGroup = await prisma.groups.create({
      data: {
        groupName,
        course,
        institutionId
      }
    })
    res.send(newGroup)
  } catch (error) {
    console.log(error)
  }
}

export const deleteGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id)
    const group = await prisma.groups.delete({
      where: {
        id
      }
    })
    res.send(group)
  } catch (error) {
    console.log(error)
  }
}

export const changeGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id)
    const { groupName, course, institutionId }: IGroup = req.body
    const changedGroup = await prisma.groups.update({
      where: {
        id
      },
      data: {
        groupName,
        course,
        institutionId
      }
    })
    res.send(changedGroup)
  } catch (error) {
    console.log(error)
  }
}
