import { useEffect, useMemo, useState } from "react";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import ExpensePieChart from "../components/ExpensePieChart";
import TransactionTable from "../components/TransactionTable";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddTransactionModal from "../components/AddTransactionModel";
import { IndianRupee, TrendingUp, Wallet } from "lucide-react";

type Transaction = {
  date: string;
  category: string;
  type: "income" | "expense";
  amount: number;
};

type Stats = {
  income: number;
  expense: number;
  balance: number;
};

type LineData = {
  name: string;
  income: number;
  expense: number;
};

type PieData = {
  name: string;
  value: number;
};

type DashboardData = {
  stats: Stats;
  lineData: LineData[];
  pieData: PieData[];
};
import { useTransaction } from "../Hooks/usetransaction";
import { useAuth } from "../Hooks/useauth";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const navigate = useNavigate();
  const{user,loading}=useAuth();
  if(loading){
    return<div>Loading...</div>
  }
 
  useEffect(() => {
  if (!loading && !user) {
    navigate('/login');
  }
}, [loading, user]);
  const [range, setRange] = useState<"weekly" | "monthly" | "yearly">("monthly");

  const {addTransaction } = useTransaction();

  const handleAddTransaction = async(tx: Transaction) => {
    try{
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/transaction/addtransaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(tx)
      });
      const data = await res.json();
      addTransaction(data.transaction);
      
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
    
  };
  const [data, setData] = useState<DashboardData>({
    stats: { income: 0, expense: 0, balance: 0 },
    lineData: [],
    pieData: [],
  });
 
  const getanalyticsdata=async()=>{
    try{
      const res=await fetch(`${import.meta.env.VITE_BASE_URL}/api/transaction/dashboard?range=${range}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });
      const data=await res.json();
      console.log("Analytics Data:",data);
      setData({
  stats: data?.stats || { income: 0, expense: 0, balance: 0 },
  lineData: data?.lineData || [],
  pieData: data?.pieData || [],
});
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  }
  useEffect(()=>{
    getanalyticsdata();
  },[range]);

  



  const analytics = useMemo(() => {
    const income = data.stats.income||0;
    const expense = data.stats.expense||0;
    const balance = data.stats.balance||0;

    const savingRate = income
      ? ((balance / income) * 100).toFixed(1)
      : "0";

    const avgTransaction = Math.round(
      (income + expense) / (data.lineData.length || 1)
    );

    const topCategory =
      [...data.pieData].sort((a, b) => b.value - a.value)[0]?.name ||
      "N/A";

    return { savingRate, avgTransaction, topCategory };
  }, [data]);

  return (
    <div className="min-h-screen bg-background text-foreground p-6">

      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Finance Dashboard</h1>

        <div className="flex items-center gap-3">
          {["weekly", "monthly", "yearly"].map((item) => (
            <button
              key={item}
              onClick={() => setRange(item as any)}
              className={`px-4 py-2 rounded-lg border ${
                range === item
                  ? "bg-primary text-primary-foreground"
                  : "bg-background"
              }`}
            >
              {item}
            </button>
          ))}
         
        </div>
      </div>

   

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        <Card>
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>Total Expense</CardTitle>
            <IndianRupee className="text-red-500" />
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-red-500">
              ₹{data.stats.expense}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>Total Income</CardTitle>
            <TrendingUp className="text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-green-500">
              ₹{data.stats.income}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>Balance</CardTitle>
            <Wallet className="text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-blue-500">
              ₹{data.stats.balance}
            </p>
          </CardContent>
        </Card>

      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <IncomeExpenseChart data={data.lineData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ExpensePieChart data={data.pieData} />
          </CardContent>
        </Card>
      </div>

        

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 my-5">

        <div className="p-5 rounded-xl border bg-muted/40">
          <div className="flex items-center gap-2 mb-2 text-blue-600">
            🎯 <h2 className="font-semibold">Top Spending Category</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {analytics.topCategory} is your highest expense category
          </p>
        </div>

        <div className="p-5 rounded-xl border bg-green-50 dark:bg-green-900/20">
          <div className="flex items-center gap-2 mb-2 text-green-600">
            📈 <h2 className="font-semibold">Savings Rate</h2>
          </div>
          <p className="text-sm text-green-700 dark:text-green-300">
            You are saving <b>{analytics.savingRate}%</b> of your income{" "}
            {Number(analytics.savingRate) > 30
              ? "(positive trend)"
              : "(needs improvement)"}
          </p>
        </div>

        <div className="p-5 rounded-xl border bg-muted/40">
          <div className="flex items-center gap-2 mb-2 text-blue-600">
            ℹ️ <h2 className="font-semibold">Average Transaction</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Your average transaction is ₹{analytics.avgTransaction}
          </p>
        </div>

      </div>

      
      <div className="flex justify-end py-4">
        <AddTransactionModal onAdd={handleAddTransaction} />
      </div>

  
     
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionTable />
          </CardContent>
        </Card>
      </div>

    </div>
  );
}