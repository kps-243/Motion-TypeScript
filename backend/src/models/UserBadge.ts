import mongoose, { Schema, Types, Document, Model } from "mongoose";

// Données métier
export interface IUserBadge {
  user: Types.ObjectId;
  badge: Types.ObjectId;
  awardedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Document Mongoose
export interface IUserBadgeDocument extends IUserBadge, Document {}

const userBadgeSchema = new Schema<IUserBadgeDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    badge: {
      type: Schema.Types.ObjectId,
      ref: "Badge",
      required: true,
    },
    awardedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index unique (user + badge)
userBadgeSchema.index({ user: 1, badge: 1 }, { unique: true });

const UserBadge: Model<IUserBadgeDocument> =
  mongoose.models.UserBadge ||
  mongoose.model<IUserBadgeDocument>("UserBadge", userBadgeSchema);

export default UserBadge;
