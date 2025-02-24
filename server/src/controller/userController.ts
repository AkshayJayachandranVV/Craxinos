import { Request, response, Response } from "express";
import mongoose from "mongoose";
const bcrypt = require("bcryptjs");
import UserModel from "../model/userModel"; 
import { CreateAccountRequest } from "../interface/IUser";
import { body, validationResult } from "express-validator";
import PersonalInfoModel  from "../model/personalInfo";
import FinancialInfo  from "../model/financialModel";

export const validateUser = [
    body("email")
        .isEmail()
        .withMessage("Invalid email format"),

    body("mobile")
        .isMobilePhone("any", { strictMode: true })
        .withMessage("Invalid mobile number format"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number"),
];

const createAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Entered createAccount");

        const { email, mobile, password }: CreateAccountRequest = req.body;

        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            res.status(200).json({success:false, message: "Email is already in use" });
            return;
        }
        console.log("1")
        const existingMobile = await UserModel.findOne({ mobile });
        if (existingMobile) {
            res.status(200).json({success:false, message: "Mobile number is already in use" });
            return;
        }
        console.log("2")
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            email,
            mobile,
            password: hashedPassword,
        });
        console.log("3")
        await newUser.save();

        res.status(201).json({success:true, message: "Account created successfully", id: newUser._id,email:newUser.email,mobile:newUser.mobile});

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({success:false, message: "Internal server error" });
    }
};



const personalInfo = async (req: Request, res: Response): Promise<void> =>{
    try {
        console.log("recahed personal info",req.body)
        const { userId, title, fullName, dob, address, residenceDuration, about } = req.body;

        if (!userId || !title || !fullName || !dob || !address || !residenceDuration) {
            res.status(200).json({ success: false, message: "All required fields must be provided." });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            res.status(200).json({ success: false, message: "Invalid userId format." });
            return;
        }

        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
        
        if (actualAge < 18) {
            res.status(200).json({ success: false, message: "You must be at least 18 years old to create an account." });
            return;
        }

        const newUserProfile = new PersonalInfoModel ({
            userId,
            title,
            fullName,
            dob: birthDate, 
            currentAddress: address,
            livingDuration: residenceDuration,
            about
        });

        await newUserProfile.save();

        res.status(201).json({ success: true, message: "User profile created successfully", data: newUserProfile });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({success:false, message: "Internal server error" }); 
    }
}


const financialInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Financial Info Request:", req.body);

        const { userId, status, savings } = req.body;

        if (!userId || !status) {
            res.status(200).json({ success: false, message: "User ID and employment status are required." });
            return;
        }

        const additionalSavings = savings ? String(savings) : "0";

        const newFinancialInfo = new FinancialInfo({
            userId,
            employmentStatus: status,
            additionalSavings,
        });

        await newFinancialInfo.save();

        res.status(201).json({
            success: true,
            message: "Financial information saved successfully.",
            data: newFinancialInfo,
        });
    } catch (error) {
        console.error("Error storing financial info:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};




const AccountInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("enetereedddddd")
       console.log(req.params.userId)

       const userId = req.params.userId;

       const user = await UserModel.findById(userId).lean();
       if (!user) {
           res.status(200).json({ success: false, message: 'User not found' });
           return;
       }

       const personalInfo = await PersonalInfoModel.findOne({ userId }).lean();
       if (!personalInfo) {
           res.status(200).json({ success: false, message: 'Personal infomation not found' });
           return;
       }

       const financialInfo = await FinancialInfo.findOne({ userId }).lean();
       if (!financialInfo) {
            res.status(200).json({ success: false, message: 'Financial information not found' });
            return
       }

       const userData = {
           ...user,
           personalInfo,
           financialInfo
       };

       res.status(200).json({ success: true, data: userData });

    } catch (error) {
        console.error("Error storing user info:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

export { createAccount, personalInfo, financialInfo, AccountInfo};