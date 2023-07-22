import express from "express"
import { Request, Response } from "express"
import * as path from 'path';
import helmet from "helmet";

import institutionsRouter from "./routers/institutions-router"
import directorsRouter from "./routers/directors-router"
import groupsRouter from "./routers/groups-router"
import studentsRouter from "./routers/students-router"
import timeTableRouter from "./routers/timeTable-router"
import weekdayRouter from "./routers/weekday-router"

declare const __dirname: string;

const app = express()
const PORT:number | string = process.env.PORT || 3000

app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.use(express.static("public"))

app.use(institutionsRouter)
app.use(directorsRouter)
app.use(groupsRouter)
app.use(studentsRouter)
app.use(timeTableRouter)

app.use(weekdayRouter)

app.get("/", (req:Request, res:Response) => {
	res.sendFile(path.resolve(__dirname, "public", "index.html"))
})

app.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`);
})