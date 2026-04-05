// context/useTransaction.ts

import { useContext } from "react";
import {type TransactionContextType, TransactionContext } from "../context/transactioncontext";

export const useTransaction = ():TransactionContextType => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error("useTransaction must be used within TransactionProvider");
  }

  return context;
};