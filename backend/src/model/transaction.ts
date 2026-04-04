import mongoose, { Schema, Types, Document } from "mongoose";

export interface ITransaction extends Document {
  userId: Types.ObjectId;
  category: string;
  amount: number;
  type: "expense" | "income";
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    type: {
      type: String,
      enum: ["expense", "income"],
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

export const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);