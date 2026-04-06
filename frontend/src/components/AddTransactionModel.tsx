import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Transaction = {
  date: string;
  category: string;
  type: "income" | "expense";
  amount: number;
};

type Props = {
  onAdd: (tx: Transaction) => void;
};

export default function AddTransactionModal({ onAdd }: Props) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [date, setDate] = useState("");
const [open, setOpen] = useState(false);
  const handleSubmit = () => {
    if (!amount || !category || !date) return;

    const newTx: Transaction = {
      amount: Number(amount),
      category,
      type,
      date,
    };

    onAdd(newTx);

   
    setAmount("");
    setCategory("");
    setDate("");
    setType("expense");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={()=>setOpen(true)}>Add Transaction</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          {/* Amount */}
          <Input
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          {/* Category */}
          <Input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          {/* Type */}
          <Select
            onValueChange={(value: "income" | "expense") =>
              setType(value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          {/* Date */}
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          {/* Submit */}
          <Button onClick={handleSubmit} className="w-full">
            Add Transaction
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}