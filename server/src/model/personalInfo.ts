import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPersonalInfo extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    title: string;
    fullName: string;
    dob: Date;
    currentAddress: string;
    livingDuration: string;
    about?: string;
}

const PersonalInfoSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        fullName: { type: String, required: true },
        dob: { type: Date, required: true },
        currentAddress: { type: String, required: true },
        livingDuration: { type: String, required: true },
        about: { type: String },
    },
    { timestamps: true }
);

const PersonalInfoModel: Model<IPersonalInfo> = mongoose.model<IPersonalInfo>(
    "PersonalInfo",
    PersonalInfoSchema
);

export default PersonalInfoModel;
