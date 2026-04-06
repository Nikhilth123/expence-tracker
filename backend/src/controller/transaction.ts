import  {Transaction } from "../model/transaction";
import { Request,Response } from "express";
import { Authrequest } from "../middlewares/authmiddleware";

export const addtransaction=async(req:Authrequest,res:Response)=>{
    const newtransaction=req.body;
   if (!req.user) {
  return res.status(401).json({
    success: false,
    msg: "User not authenticated",
  });
}

const id = req.user.id;
    if(!newtransaction){
        return res.status(400).json({
            success:false,
            msg:"transaction not found"
        })
    }
    if(!id){
        return res.status(401).json({
            success:false,
            msg:"user id not found",
        })
    }
    newtransaction.userId=id;
    try{
    const temp= await Transaction.create(newtransaction);
    console.log("Created Transaction:", temp);
    const responsetransaction = {
  id: temp._id.toString(), 
  category: temp.category,
  amount: temp.amount,
  type: temp.type,
  date: temp.date.toISOString().split("T")[0], 
};

    return res.status(200).json({
        success:true,
        msg:"transaction created successfully",
        transaction:responsetransaction,
    });
}
catch(err){
    return res.status(500).json({
        success:true,
        msg:"internal server error ",
    })
}
}
export const deletetransaction = async (req: Authrequest, res: Response) => {
  console.log("Delete Transaction Request Params:", req.params);
  const { id: transactionid } = req.params;
  console.log("Delete Transaction Request for ID:", transactionid);
  if (!transactionid) {
    return res.status(400).json({
      success: false,
      msg: "transaction id is required",
    });
  }

  if (!req.user) {
    return res.status(401).json({
      success: false,
      msg: "user is unauthorized",
    });
  }

  try {
    const transaction = await Transaction.findById(transactionid);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        msg: "transaction not found",
      });
    }

  
    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        msg: "not allowed",
      });
    }

    await Transaction.findByIdAndDelete(transactionid);

    return res.status(200).json({
      success: true,
      msg: "transaction deleted successfully",
    });
  } catch (err) {
    console.log("Error deleting transaction:", err);
    return res.status(500).json({
      success: false,
      msg: "internal server error",
    });
  }

};
export const gettransaction = async (req: Authrequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      msg: "user id not found",
    });
  }

  try {
    
    const {
      page = "1",
      limit = "5",
      category,
      type,
      from,
      to,
    } = req.query;

   
    let pageNumber = parseInt(page as string);
    let limitNumber = parseInt(limit as string);

    if (pageNumber < 1) pageNumber = 1;
    if (limitNumber < 1) limitNumber = 5;

    const skip = (pageNumber - 1) * limitNumber;


    let filter: any = { userId };

    
    if (category && category !== "") {
      filter.category = category;
    }

 
    if (type && type !== "") {
      filter.type = type;
    }

   
    const dateFilter: any = {};

    const fromDate = from ? new Date(from as string) : null;
    const toDate = to ? new Date(to as string) : null;

    if (fromDate && !isNaN(fromDate.getTime())) {
      dateFilter.$gte = fromDate;
    }

    if (toDate && !isNaN(toDate.getTime())) {
      dateFilter.$lte = toDate;
    }

 
    if (Object.keys(dateFilter).length > 0) {
      filter.date = dateFilter;
    }

 
    const transactions = await Transaction.find(filter)
      .sort({ date: -1 }) 
      .skip(skip)
      .limit(limitNumber);

    const total = await Transaction.countDocuments(filter);

    const responseTransactions = transactions.map((tx) => ({
      id: tx._id.toString(),
      category: tx.category,
      amount: tx.amount,
      type: tx.type,
      date: tx.date.toISOString().split("T")[0],
    }));

    return res.status(200).json({
      success: true,
      msg: "transactions found",
      currentPage: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      totalTransactions: total,
      transactions: responseTransactions,
    });

  } catch (err) {
    console.error("Error fetching transactions:", err);

    return res.status(500).json({
      success: false,
      msg: "internal server error",
    });
  }
};