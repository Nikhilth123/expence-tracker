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
    return res.status(200).json({
        success:true,
        msg:"transaction created successfully",
        transaction:newtransaction,
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
  const { id: transactionid } = req.params;

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

    // 🔥 IMPORTANT: check ownership
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
    return res.status(500).json({
      success: false,
      msg: "internal server error",
    });
  }
};