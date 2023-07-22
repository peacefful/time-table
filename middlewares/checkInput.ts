import { Request, Response, NextFunction } from 'express';
import { isEmpty } from "../utils/isEmpty"

export function getDataFrominstitutions (req:Request, res:Response, next:NextFunction):void {
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