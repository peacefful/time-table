import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { ITutor } from '../interfaces/tutor'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { hashPassword } from '../utils/hashPasword'
import { validationResult } from 'express-validator'
import { keyJwt } from '../config/key'

const prisma = new PrismaClient()

export const getTutors = async (req: Request, res: Response): Promise<void> => {
  try {
    const tutors = await prisma.tutor.findMany()
    res.send(tutors)
  } catch (error) {
    console.log(error)
  }
}

export const addTutor = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    } else {
      const { name, surname, password, groupId, role, userId }: ITutor = req.body
      const hashedPassword: string = await hashPassword(password)
      const tutors = await prisma.tutor.create({
        data: {
          name,
          surname,
          password: hashedPassword,
          groupId,
          userId,
          role
        }
      })
      res.send(tutors)
    }
  } catch (error) {
    console.log(error)
  }
}

export const checkTutor = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    } else {
      const { surname, password, role }: ITutor = req.body
      const tutor = await prisma.tutor.findFirst({
        where: {
          surname,
          role
        }
      })

      if (tutor) {
        const passwordMatch = await bcrypt.compare(password, tutor.password)
        if (passwordMatch) {
          const token = jwt.sign(
            {
              name: tutor.name,
              surname: tutor.surname,
              password: tutor.password,
              tutorId: tutor.id,
              role: tutor.role
            },
            keyJwt,
            { expiresIn: 60 * 60 }
          )
          res.status(200).json({
            token: `Bearer ${token}`,
            id: tutor.id,
            role: tutor.role
          })
        } else {
          res.status(401).json({ message: 'Invalid credentials' })
        }
      } else {
        res.status(404).json({ message: 'User not found' })
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const deleteTutor = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id)
    const tutors = await prisma.tutor.delete({
      where: {
        id
      }
    })
    res.send(tutors)
  } catch (error) {
    console.log(error)
  }
}

export const changeTutor = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    } else {
      const id: number = parseInt(req.params.id)
      const { name, surname, password, groupId, role }: ITutor = req.body
      const hashedPassword: string = await hashPassword(password)
      const tutors = await prisma.tutor.update({
        where: {
          id
        },
        data: {
          name,
          surname,
          password: hashedPassword,
          groupId,
          role
        }
      })
      res.send(tutors)
    }
  } catch (error) {
    console.log(error)
  }
}

export const updateGroupId = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id)
    const { groupId }: ITutor = req.body
    const tutors = await prisma.tutor.update({
      where: {
        id
      },
      data: {
        groupId
      }
    })
    res.send(tutors)
  } catch (error) {
    console.log(error)
  }
}
