import mongoose, { Schema, Document, Types } from "mongoose";

export interface IGymEquipment extends Document {
  gym: Types.ObjectId;
  equipment: Types.ObjectId;
  quantity: number;
}

const gymEquipmentSchema: Schema<IGymEquipment> = new Schema(
  {
    gym: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gym",
      required: true,
    },
    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 0,
    },
  },
  { timestamps: true }
);

// Index unique (gym + equipment)
gymEquipmentSchema.index({ gym: 1, equipment: 1 }, { unique: true });

export default mongoose.model<IGymEquipment>("GymEquipment", gymEquipmentSchema);
