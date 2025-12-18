import mongoose, { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import ROLES from "../config/roles";

export interface IUser extends Document {
  name: string;
  firstName: string;
  email: string;
  password: string;
  role: string;
  score: number;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.CUSTOMER,
    },
    score: { type: Number, default: 0 },
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator);

export default mongoose.model<IUser>("User", UserSchema);
