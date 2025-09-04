// import React, { useEffect, useState } from "react";
// import Dashboard from "../components/Dashboard";
// import useUser from "../hooks/useUser";
// import { Coins, Wallet, WalletCards } from "lucide-react";
// import { toast } from "react-toastify";
// import axiosConfig from "../utils/axiosConfig";
// import InfoCard from "../components/InfoCard";
// import RecentTransactions from "../components/RecentTransactions";
// import FinanceOverview from "../components/FinanceOverview";
// import Transactions from "../components/Transactions";

// const Home = () => {
//   useUser();

//   const [dashboardData, setDashboardData] = useState(null);

//   const fetchDashboardData = async () => {
//     try {
//       const response = await axiosConfig.get("/dashboard");
//       setDashboardData(response.data);
//     } catch (error) {
//       toast.error("Error fetching dashboard data");
//       console.error("Error fetching dashboard data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   return (
//     <div>
//       <Dashboard activeMenu="Dashboard">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 m-4">
//           <InfoCard
//             icon={<WalletCards className="w-6 h-6" />}
//             label="Total Balance"
//             value={dashboardData ? dashboardData.totalBalance : 0}
//             color="bg-purple-700"
//           />

//           <InfoCard
//             icon={<Wallet className="w-6 h-6" />}
//             label="Total Income"
//             value={dashboardData ? dashboardData.totalIncome : 0}
//             color="bg-green-700"
//           />

//           <InfoCard
//             icon={<Coins className="w-6 h-6" />}
//             label="Total Expense"
//             value={dashboardData ? dashboardData.totalExpense : 0}
//             color="bg-red-700"
//           />
//         </div>

//         {/* Recent Txns. */}

//         <RecentTransactions
//           transactions={dashboardData?.recentTransactions}
//           onMore={() => navigate("expense")}
//         />
//         {/* finance overview charts */}
//         <FinanceOverview
//           totalBalance={dashboardData?.totalBalance}
//           totalIncome={dashboardData?.totalIncome}
//           totalExpense={dashboardData?.totalExpense}
//         />

//         {/* expense txns. */}
//         <Transactions
//           type="expense"
//           transactions={dashboardData?.recent5Expenses}
//           onMore={() => navigate("/expense")}
//         />

//         {/* income txns. */}
//         <Transactions
//           type="income"
//           transactions={dashboardData?.recent5Incomes}
//           onMore={() => navigate("/income")}
//         />
//       </Dashboard>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import { Coins, Wallet, WalletCards } from "lucide-react";
import { toast } from "react-toastify";
import axiosConfig from "../utils/axiosConfig";
import InfoCard from "../components/InfoCard";
import RecentTransactions from "../components/RecentTransactions";
import FinanceOverview from "../components/FinanceOverview";
import Transactions from "../components/Transactions";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useUser();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const response = await axiosConfig.get("/dashboard");
      setDashboardData(response.data);
    } catch (error) {
      toast.error("Error fetching dashboard data");
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
      <Dashboard activeMenu="Dashboard">
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-4">
          <InfoCard
            icon={<WalletCards className="w-6 h-6" />}
            label="Total Balance"
            value={dashboardData ? dashboardData.totalBalance : 0}
            color="bg-purple-700"
          />
          <InfoCard
            icon={<Wallet className="w-6 h-6" />}
            label="Total Income"
            value={dashboardData ? dashboardData.totalIncome : 0}
            color="bg-green-700"
          />
          <InfoCard
            icon={<Coins className="w-6 h-6" />}
            label="Total Expense"
            value={dashboardData ? dashboardData.totalExpense : 0}
            color="bg-red-700"
          />
        </div>

        {/* Second Row: Recent Transactions + Finance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onMore={() => navigate("/expense")}
          />
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance}
            totalIncome={dashboardData?.totalIncome}
            totalExpense={dashboardData?.totalExpense}
          />
        </div>

        {/* Third Row: Income + Expense */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <Transactions
            type="income"
            transactions={dashboardData?.recent5Incomes}
            onMore={() => navigate("/income")}
          />
          <Transactions
            type="expense"
            transactions={dashboardData?.recent5Expenses}
            onMore={() => navigate("/expense")}
          />
        </div>
      </Dashboard>
    </div>
  );
};

export default Home;
