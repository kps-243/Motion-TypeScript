import mongoose, { Schema, Document } from "mongoose";

export interface IGym extends Document {
  name: string;
  description: string;
  capacity: number;
  address: string;
  city: string;
  zipCode: number;
  contact: number;
}

const gymSchema: Schema<IGym> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: Number, required: true },
    contact: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IGym>("Gym", gymSchema);
