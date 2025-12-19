// src/models/ChallengeInvite.ts
import mongoose, { Schema, Types, Document, Model } from "mongoose";

export type ChallengeInviteStatus = "PENDING" | "ACCEPTED" | "DECLINED" | "CANCELED";

export interface IChallengeInvite {
  challenge: Types.ObjectId;
  fromUser: Types.ObjectId;
  toUser: Types.ObjectId;
  status: ChallengeInviteStatus;
  message?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IChallengeInviteDocument extends IChallengeInvite, Document {}

const challengeInviteSchema = new Schema<IChallengeInviteDocument>(
  {
    challenge: { type: Schema.Types.ObjectId, ref: "Challenge", required: true },
    fromUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    toUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "DECLINED", "CANCELED"],
      default: "PENDING",
    },
    message: { type: String, trim: true },
  },
  { timestamps: true }
);

challengeInviteSchema.index({ challenge: 1, toUser: 1 }, { unique: true });

const ChallengeInvite: Model<IChallengeInviteDocument> =
  mongoose.models.ChallengeInvite ||
  mongoose.model<IChallengeInviteDocument>("ChallengeInvite", challengeInviteSchema);

export default ChallengeInvite;
