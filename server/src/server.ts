import express from 'express'
import {dbConnection} from './config/database'
import cors from 'cors'
import userRouter from './router/userRouter'
const app = express()
app.use(express.json())
dbConnection()



const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}

app.use(cors(corsOptions))

app.use("/",userRouter)

// app.post("/createAccount",(req,res)=>{
//     console.log("entered post",req.body)
// })

app.listen(4000,()=>{
    console.log("server is listening")
})