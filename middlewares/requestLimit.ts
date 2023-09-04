import { Request, Response, NextFunction } from 'express'
import rateLimit from 'express-rate-limit'

export const limiter = (req: Request, res: Response, next: NextFunction): void => {
  try {
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false
    })
    next()
  } catch (error) {
    console.log(error)
  }
}
