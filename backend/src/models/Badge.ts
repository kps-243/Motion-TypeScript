import mongoose, { Schema, Types, Document, Model } from "mongoose";

/**
 * Interface métier
 */
export interface IBadge {
  name: string;
  description?: string;
  icon?: string;
  ruleType: "TOTAL_CHALLENGES_COMPLETED";
  ruleValue: number;
  points: number;
  isActive: boolean;
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Document Mongoose
 */
export interface IBadgeDocument extends IBadge, Document {}

const badgeSchema = new Schema<IBadgeDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
    },
    ruleType: {
      type: String,
      enum: ["TOTAL_CHALLENGES_COMPLETED"],
      required: true,
    },
    ruleValue: {
      type: Number,
      required: true,
      min: 1,
    },
    points: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // admin
    },
  },
  { timestamps: true }
);

const Badge: Model<IBadgeDocument> =
  mongoose.models.Badge ||
  mongoose.model<IBadgeDocument>("Badge", badgeSchema);

export default Badge;
