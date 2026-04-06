import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Hooks/useauth";
const Home = () => {
  const navigate = useNavigate();
const { user,loading} = useAuth();
if(loading) {
    return <div className="flex items-center justify-center h-screen">
    Loading...
  </div>
}
  
  if (user) {
    navigate("/dashboard");
  }
  return (
    <div className="w-full">

      <section className="text-center py-24 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white dark:from-blue-700 dark:to-indigo-900">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Take Control of Your Finances 💰
        </h1>

        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90">
          Track your income, monitor expenses, and gain powerful insights
          to manage your money smarter.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          {!user&&<Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>
}

         <Button
  size="lg"
  variant="outline"
  className="border-white text-white hover:bg-white hover:text-blue-600 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-blue-600 
             border-primary text-primary hover:bg-primary hover:text-white"
  onClick={() => navigate("/dashboard")}
>
  View Dashboard
</Button>
        </div>
      </section>

      
      <section className="py-20 px-6 bg-background text-foreground">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose ExpenseTracker?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <Card className="group rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl cursor-pointer">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-3 transition group-hover:text-blue-600">
                📊 Track Expenses
              </h3>
              <p className="text-muted-foreground">
                Easily record and categorize all your daily transactions.
              </p>
            </CardContent>
          </Card>

          <Card className="group rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl cursor-pointer">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-3 transition group-hover:text-blue-600">
                📈 Visual Insights
              </h3>
              <p className="text-muted-foreground">
                Understand your spending patterns with charts and analytics.
              </p>
            </CardContent>
          </Card>

          <Card className="group rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl cursor-pointer">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-3 transition group-hover:text-blue-600">
                🔒 Secure Data
              </h3>
              <p className="text-muted-foreground">
                Your financial data is safe and protected.
              </p>
            </CardContent>
          </Card>

        </div>
      </section>

   
      <section className="py-20 px-6 bg-muted text-center">
        <h2 className="text-3xl font-bold mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <div className="transition-all duration-300 hover:-translate-y-2">
            <div className="text-3xl mb-3">1️⃣</div>
            <h3 className="font-semibold text-lg mb-2">Add Transactions</h3>
            <p className="text-muted-foreground">
              Enter your income and expenses quickly.
            </p>
          </div>

          <div className="transition-all duration-300 hover:-translate-y-2">
            <div className="text-3xl mb-3">2️⃣</div>
            <h3 className="font-semibold text-lg mb-2">Track Spending</h3>
            <p className="text-muted-foreground">
              Monitor where your money goes every day.
            </p>
          </div>

          <div className="transition-all duration-300 hover:-translate-y-2">
            <div className="text-3xl mb-3">3️⃣</div>
            <h3 className="font-semibold text-lg mb-2">Gain Insights</h3>
            <p className="text-muted-foreground">
              Improve your financial habits with smart analysis.
            </p>
          </div>

        </div>
      </section>

      <section className="py-20 px-6 text-center bg-background">
        <h2 className="text-3xl font-bold mb-4">
          Start Managing Your Money Today 🚀
        </h2>

        <p className="text-muted-foreground mb-6">
          Join now and take full control of your finances.
        </p>

       {!user && <Button
          size="lg"
          className="transition-all duration-200 hover:scale-105 active:scale-95"
          onClick={() => navigate("/signup")}
        >
          Get Started Free
        </Button>
        }
      </section>


    </div>
  );
};

export default Home;