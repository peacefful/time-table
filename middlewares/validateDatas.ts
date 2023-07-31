import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';

export const checkValidateDatas = (property:string, min:number, max:number) => body(property).trim().isLength({ min: min, max:max }).withMessage("Error, incorrect data")

export function checkingSqlInjection(req:Request, res:Response, next:NextFunction):void {
	try {
		const query:string[] = ["create", "insert", "select", "where", "update", "set", "delete"]
		if (req.method === "POST" || req.method === "PUT") {
			for (const key in req.body) {
				if (typeof req.body[key] === "string") {
					let keyToLowerCase:string = req.body[key].toLowerCase()
					if(query.includes(keyToLowerCase)) {
						next(res.json({ error: "Недопустимый оператор" }))
						break
					}
				}
			}
		}
		next()
	} catch (error) {
		console.log(error);
	}
}