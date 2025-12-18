import mongoose, { Schema, Types, Document, Model } from "mongoose";

/**
 * Données métier
 */
export interface IPractice {
  name: string;
  description?: string;
  targetMuscles: string[];
  createdBy: Types.ObjectId;
  gymId: Types.ObjectId;
}

/**
 * Document Mongoose
 */
export interface IPracticeDocument extends IPractice, Document {}

const practiceSchema = new Schema<IPracticeDocument>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    targetMuscles: [{ type: String }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    gymId: { type: Schema.Types.ObjectId, ref: "Gym", required: true },
  },
  { timestamps: true }
);

const Practice: Model<IPracticeDocument> =
  mongoose.models.Practice ||
  mongoose.model<IPracticeDocument>("Practice", practiceSchema);

export default Practice;
