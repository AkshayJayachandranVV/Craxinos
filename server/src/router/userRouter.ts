import express from 'express'
import {createAccount, validateUser,personalInfo,financialInfo,AccountInfo} from "../controller/userController";
const userRouter = express.Router()


userRouter.post("/createAccount",validateUser,createAccount)
userRouter.post("/personalInfo",validateUser,personalInfo)
userRouter.post("/financialInfo",validateUser,financialInfo)
userRouter.get("/dashboard/:userId",AccountInfo)

export default userRouter


