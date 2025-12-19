import mongoose, { Schema, Types, Document, Model } from "mongoose";

export interface IChallenge {
  name: string;
  description?: string;
  createdBy: Types.ObjectId;
  practices: Types.ObjectId[];
  gymId: Types.ObjectId;
  participants: Types.ObjectId[];
  isCollaborative: boolean;
  completedBy: Types.ObjectId[];
}

export interface IChallengeDocument extends IChallenge, Document {}

const challengeSchema = new Schema<IChallengeDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    practices: [{ type: Schema.Types.ObjectId, ref: "Practice", required: true }],
    gymId: { type: Schema.Types.ObjectId, ref: "Gym", required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    isCollaborative: { type: Boolean, default: true },
    completedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Challenge: Model<IChallengeDocument> =
  mongoose.models.Challenge ||
  mongoose.model<IChallengeDocument>("Challenge", challengeSchema);

export default Challenge;
