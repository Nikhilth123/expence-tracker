import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Trash2 } from "lucide-react";


import { useTransaction } from "../Hooks/usetransaction";
export default function TransactionTable({ refreshAnalytics }: any) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
    const { transactions, deleteTransaction,setTransactions } = useTransaction();

    const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  //get transactions from db 

  const gettransactions = async() => {
    try{
     const res = await fetch(
  `${import.meta.env.VITE_BASE_URL}/api/transaction/alltransactions?page=${currentPage}&limit=10&type=${typeFilter}&category=${search}&from=${fromDate}&to=${toDate}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);
      if (!res.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await res.json();
     
        console.log("Transactions fetched successfully",data);
         setTransactions(data.transactions);
         setCurrentPage(data.currentPage);
         setTotalPages(data.totalPages);
         
      
      
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  useEffect(() => {
  const delay = setTimeout(() => {
    gettransactions();
  }, 300);

  return () => clearTimeout(delay);
}, [search, typeFilter, fromDate, toDate, currentPage]);
 
    //delete transaction handler  
    const onDelete = async(id: string) => {
      try{
        console.log("Attempting to delete transaction with ID:", id);
        const res = await fetch( `${import.meta.env.VITE_BASE_URL}/api/transaction/delete/${id}`,
  {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, 
    },
  }
);
        if (!res.ok) {
          throw new Error("Failed to delete transaction");
        } else {   
          const data =await res.json();
          console.log(data);
          deleteTransaction(id);
          await refreshAnalytics();
         
                 console.log("Transaction deleted successfully");
        }
      }
      catch (error) {
        console.error("Error deleting transaction:", error);
      }
     
    };


  return (
    <div className="space-y-4">

      
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-background"
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-background"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-background"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-background"
        />
      </div>

     
      <div className="rounded-xl border bg-card text-card-foreground">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.date}</TableCell>
                <TableCell>{tx.category}</TableCell>

                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      tx.type === "income"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {tx.type}
                  </span>
                </TableCell>

                <TableCell className="text-right font-medium">
                  ₹{tx.amount}
                </TableCell>

               
                <TableCell className="text-right">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="text-red-500 hover:bg-red-100 p-2 rounded">
                        <Trash2 size={18} />
                      </button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete Transaction?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your transaction.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(tx.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}

            {transactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        { transactions.length>0 && (
        <Pagination>
  <PaginationContent>

   
    <PaginationItem>
      <PaginationPrevious
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      />
    </PaginationItem>

    {Array.from({ length: totalPages }, (_, i) => (
      <PaginationItem key={i}>
        <PaginationLink
          isActive={currentPage === i + 1}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    ))}

   
    <PaginationItem>
      <PaginationNext
        onClick={() =>
          setCurrentPage((p) => Math.min(p + 1, totalPages))
        }
      />
    </PaginationItem>

  </PaginationContent>
</Pagination>
    )}
      </div>
    </div>
  );
}