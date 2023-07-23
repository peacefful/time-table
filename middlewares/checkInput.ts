import { Request, Response, NextFunction } from 'express';
import { isEmpty } from "../utils/isEmpty"

export function getDataFromInstitutions (req:Request, res:Response, next:NextFunction):void {
	try {
		if(req.method === "POST") {
			if (req.body.appellation.length <= 2 || isEmpty(req.body)) {
				next(res.send({ error: "Данные не корректные" }))
			}
		} else {
			next()
		}
		next()
	} catch (error) {
		console.log(error);
	}
}

export function checkingSqlInjection(req:Request, res:Response, next:NextFunction):void {
	try {
		const query:string[] = ["create", "insert", "select", "where", "update", "set", "delete"]
		if (req.method === "POST") {
			for (const key in req.body) {
				if (typeof req.body[key] === "string") {
					let keyToLowerCase:string = req.body[key].toLowerCase()
					if(query.includes(keyToLowerCase)) {
						next(res.send({ error: "Недопустимый оператор" }))
						break
					}
				} else {
					next()
				}
			}
		}
		next()
	} catch (error) {
		console.log(error);
	}
}