

import { useState } from "react";
import {
  type Transaction,
  TransactionContext,
} from "./transactioncontext";

export const TransactionProvider = ({ children }: any) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

 
  const addTransaction = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  
  const deleteTransaction = (id: string) => {
  setTransactions((prev) =>
    prev.filter((t: any) => (t.id || t._id) !== id)
  );
};

 
  const setAllTransactions = (txs: Transaction[]) => {
    setTransactions(txs);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        setTransactions: setAllTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};