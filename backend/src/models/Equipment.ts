import mongoose, { Schema, Document, Types } from "mongoose";

export interface IEquipment extends Document {
  name: string;
  description?: string;
  createdBy: Types.ObjectId;
}

const equipmentSchema: Schema<IEquipment> = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IEquipment>("Equipment", equipmentSchema);
