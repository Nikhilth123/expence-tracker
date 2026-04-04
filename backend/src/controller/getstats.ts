import { Response } from "express";
import mongoose from "mongoose";
import { Transaction } from "../model/transaction";
import { Authrequest } from "../middlewares/authmiddleware";

export const getStats = async (req: Authrequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        msg: "Unauthorized",
      });
    }

    const userId = new mongoose.Types.ObjectId(req.user.id);
    const type = req.query.type as string;

    let matchStage: any = { userId };
    let groupBy: any;

    const now = new Date();

    // 🔥 YEARLY → last 5 years
    if (type === "yearly") {
      const currentYear = now.getFullYear();
      const startYear = currentYear - 4;

      matchStage.date = {
        $gte: new Date(`${startYear}-01-01`),
        $lte: new Date(`${currentYear}-12-31`),
      };

      groupBy = { $year: "$date" };
    }

    // 🔥 MONTHLY → current year only
    else if (type === "monthly") {
      const currentYear = now.getFullYear();

      matchStage.date = {
        $gte: new Date(`${currentYear}-01-01`),
        $lte: new Date(`${currentYear}-12-31`),
      };

      groupBy = { $month: "$date" };
    }

    // 🔥 WEEKLY → current week (Mon–Sun)
    else if (type === "weekly") {
      const day = now.getDay(); // 0=Sun, 1=Mon...
      const diffToMonday = day === 0 ? -6 : 1 - day;

      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() + diffToMonday);
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      matchStage.date = {
        $gte: startOfWeek,
        $lte: endOfWeek,
      };

      groupBy = { $dayOfWeek: "$date" }; // 1=Sun ... 7=Sat
    }

    else {
      return res.status(400).json({
        success: false,
        msg: "Invalid type",
      });
    }

    // 🔥 Aggregation
    const data = await Transaction.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: groupBy,
          income: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
            },
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 🔥 FORMAT OUTPUT

    let formattedData: any = [];

    // 📆 Monthly → Jan–Dec
    if (type === "monthly") {
      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

      formattedData = months.map((month, index) => {
        const found = data.find(d => d._id === index + 1);
        return {
          label: month,
          income: found?.income || 0,
          expense: found?.expense || 0,
        };
      });
    }

    // 📅 Weekly → Mon–Sun
    else if (type === "weekly") {
      const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

      formattedData = days.map((day, index) => {
        const found = data.find(d => d._id === index + 1);
        return {
          label: day,
          income: found?.income || 0,
          expense: found?.expense || 0,
        };
      });
    }

    // 📊 Yearly → last 5 years
    else if (type === "yearly") {
      const currentYear = now.getFullYear();
      const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

      formattedData = years.map((year) => {
        const found = data.find(d => d._id === year);
        return {
          label: year,
          income: found?.income || 0,
          expense: found?.expense || 0,
        };
      });
    }

    return res.status(200).json({
      success: true,
      type,
      data: formattedData,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};