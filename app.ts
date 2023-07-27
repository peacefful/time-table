import express from "express"
import { Request, Response } from "express"
import * as path from 'path';
import helmet from "helmet";
import cors from "cors"

import institutionsRouter from "./routers/institutions-router"
import directorsRouter from "./routers/directors-router"
import groupsRouter from "./routers/groups-router"
import studentsRouter from "./routers/students-router"
import timeTablesRouter from "./routers/timeTables-router"
import tutorsRouter from "./routers/weekdays-router"
import weekdaysRouter from "./routers/tutors-router"

import { checkingSqlInjection } from "./middlewares/validateDatas";
import { limiter } from "./middlewares/requestLimit"

declare const __dirname: string;

const app = express()
const PORT:number | string = process.env.PORT || 3000

app.use(helmet())
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.use(express.static("public"))

app.use(checkingSqlInjection)
app.use(limiter)

app.use(institutionsRouter)
app.use(directorsRouter)
app.use(groupsRouter)
app.use(studentsRouter)
app.use(timeTablesRouter)
app.use(tutorsRouter)

app.use(weekdaysRouter)

app.get("/", (req:Request, res:Response) => {
	res.sendFile(path.resolve(__dirname, "public", "index.html"))
})

app.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`);
})