

import { useState } from "react";
import {
  type Transaction,
  TransactionContext,
} from "./transactioncontext";

export const TransactionProvider = ({ children }: any) => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      date: "2026-04-01",
      category: "Food",
      type: "expense",
      amount: 500,
    },
    {
      id: "2",
      date: "2026-04-02",
      category: "Salary",
      type: "income",
      amount: 20000,
    },
  ]);

 
  const addTransaction = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  
  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
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