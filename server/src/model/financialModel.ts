import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFinancialInfo extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    employmentStatus: string;
    additionalSavings: string;
}

const FinancialInfoSchema: Schema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        employmentStatus: { type: String, required: true },
        additionalSavings: { type:String , required: true },
    },
    { timestamps: true }
);

const FinancialInfoModel: Model<IFinancialInfo> = mongoose.model<IFinancialInfo>("FinancialInfo", FinancialInfoSchema);
export default FinancialInfoModel;
