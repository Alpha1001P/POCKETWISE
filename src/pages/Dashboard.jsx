import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/layout.css";
import "../components/dashboard/dashboard.css";
import ManageBudgetModal from "../components/dashboard/ManageBudgetModal";
import TransactionForm from "../components/TransactionForm";
import BudgetCard from "../components/dashboard/BudgetCard";
import TotalBalanceCard from "../components/dashboard/TotalBalanceCard";
import AccountsSection from "../components/dashboard/AccountsSection";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import SpendingTrendChart from "../components/charts/SpendingTrendChart";
import DashboardFooter from "../components/dashboard/DashboardFooter";

import "../components/dashboard/dashboard.css";

import AddAccountModal from "../components/AddAccountModal";
import EditAccountModal from "../components/EditAccountModal";
import { getBudget, saveBudget } from "../utils/budget";
import "../styles/dashboard.css";
function Dashboard() {
const navigate = useNavigate();
const [trendView, setTrendView] = useState("Month");
const [showBudgetModal, setShowBudgetModal] =
  useState(false);
const [transactions, setTransactions] = useState(() => {
  return (
    JSON.parse(localStorage.getItem("transactions")) || []
  );
});

  const [showAddAccount,setShowAddAccount]=useState(false);
const [editingBudget, setEditingBudget] = useState(false);
const [budgetInput, setBudgetInput] = useState("");


  const [accounts, setAccounts] = useState(() => {

    return (

      JSON.parse(
        localStorage.getItem("accounts")
      ) ||

      [
        {
          id:1,
          name:"Cash Wallet",
          icon:"💵",
        }
      ]

    );

  });




  const [editingTransaction, setEditingTransaction] =
    useState(null);

const [showTransactionModal, setShowTransactionModal] =
  useState(false);

  const [editingAccount,setEditingAccount] =
    useState(null);







  useEffect(()=>{

    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );

  },[transactions]);






  useEffect(()=>{

    localStorage.setItem(
      "accounts",
      JSON.stringify(accounts)
    );

  },[accounts]);







  function addTransaction(transaction){

    setTransactions((prev)=>[
      ...prev,
      transaction
    ]);

  }







  function updateTransaction(updated){


    setTransactions((prev)=>

      prev.map((item)=>

        item.id === updated.id
        ?
        updated
        :
        item

      )

    );


    setEditingTransaction(null);

  }







  function deleteTransaction(id){


    setTransactions((prev)=>

      prev.filter(
        (item)=>item.id !== id
      )

    );

  }







  function deleteAccount(id){

    setAccounts((prev)=>

      prev.filter(
        (account)=>account.id !== id
      )

    );

  }
function updateAccount(updatedAccount) {

  setAccounts((prev) =>
    prev.map((account) =>
      account.id === updatedAccount.id
        ? updatedAccount
        : account
    )
  );

  setEditingAccount(null);
}

function saveBudgets(updatedAccounts) {

  setAccounts(updatedAccounts);

  localStorage.setItem(
    "accounts",
    JSON.stringify(updatedAccounts)
  );

  setShowBudgetModal(false);

}

  const totalBalance = accounts.reduce(

    (sum, account)=>{


      const balance = transactions.reduce(

        (total, transaction)=>{


          if(
            transaction.account !== account.name
          )

          return total;



          if(
            transaction.type === "Income"
          )

          {

            return (
              total +
              Number(transaction.amount)
            );

          }


          return (
            total -
            Number(transaction.amount)
          );


        },

        0

      );


      return sum + balance;


    },

    0

  );







  // Dynamic Budget Calculation

 // Monthly Budget

const budgetData = getBudget();

const monthlyBudget = Number(budgetData.monthly || 0);
function handleSave(newBudget) {
  saveBudget({
    monthly: Number(newBudget),
    categories: budgetData.categories || {}
  });

  setBudgetInput(newBudget);
  setEditingBudget(false);
}



const currentMonth = new Date().getMonth();

const currentYear = new Date().getFullYear();

const totalExpense = transactions

  .filter((item) => {

    if (item.type !== "Expense")
      return false;

    const date = new Date(item.date);

    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );

  })

  .reduce(

    (sum, item) =>
      sum + Number(item.amount),

    0

  );

const remaining =
  monthlyBudget - totalExpense;

const remainingPercentage =
  monthlyBudget > 0
    ? Math.max(
        0,
        Math.round(
          (remaining / monthlyBudget) * 100
        )
      )
    : 0;

const exceeded =
  totalExpense > monthlyBudget;

const exceededAmount =
  totalExpense - monthlyBudget;
 // ---------------- AI Insights ----------------
// ================= AI ASSISTANT =================
const expenseTransactions = transactions.filter((t) => {
  if (t.type !== "Expense") return false;
 
  const date = new Date(t.date);

  return (
    date.getMonth() === currentMonth &&
    date.getFullYear() === currentYear
  );
});

const incomeTransactions = transactions.filter((t) => {
  if (t.type !== "Income") return false;

  const date = new Date(t.date);

  return (
    date.getMonth() === currentMonth &&
    date.getFullYear() === currentYear
  );
});
const aiInsights = [];

/* Highest Spending Category */

const categoryTotals = {};

expenseTransactions.forEach((t) => {
  const category = t.category || "Other";

  categoryTotals[category] =
    (categoryTotals[category] || 0) +
    Number(t.amount);
});

const highestCategory = Object.entries(categoryTotals).sort(
  (a, b) => b[1] - a[1]
)[0];

if (highestCategory) {

  aiInsights.push(
    `💡 ${highestCategory[0]} is your highest spending category (₹${highestCategory[1].toLocaleString("en-IN")}).`
  );

}

/* Budget */

if (monthlyBudget > 0) {

  if (exceeded) {

    aiInsights.push(
      `⚠️ You've exceeded your monthly budget by ₹${exceededAmount.toLocaleString("en-IN")}.`
    );

  } else {

    aiInsights.push(
      `🎯 You still have ₹${remaining.toLocaleString("en-IN")} remaining this month.`
    );

  }

}

/* Expense Count */

if (expenseTransactions.length > 0) {

  aiInsights.push(
    `📈 You've recorded ${expenseTransactions.length} expense transactions this month.`
  );

}

/* Income */

if (incomeTransactions.length === 0) {

  aiInsights.push(
    "💰 No income has been recorded this month."
  );

} else {

  const latestIncome =
    incomeTransactions[incomeTransactions.length - 1];

  aiInsights.push(
    `💵 Latest income: ₹${Number(
      latestIncome.amount
    ).toLocaleString("en-IN")} via ${latestIncome.account}.`
  );

}

/* Most Used Account */

const accountTotals = {};

transactions.forEach((t) => {

  accountTotals[t.account] =
    (accountTotals[t.account] || 0) + 1;

});

const favouriteAccount =
  Object.entries(accountTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

if (favouriteAccount) {

  aiInsights.push(
    `🏦 ${favouriteAccount[0]} is your most-used account.`
  );

}

/* Weekend Spending */

const weekendExpenses = expenseTransactions.filter((t) => {

  const day = new Date(t.date).getDay();

  return day === 0 || day === 6;

});

if (
  weekendExpenses.length >
  expenseTransactions.length / 2 &&
  expenseTransactions.length > 4
) {

  aiInsights.push(
    "📅 Most of your spending happens during weekends."
  );

}

/* Healthy Spending */

if (
  !exceeded &&
  remainingPercentage >= 50
) {

  aiInsights.push(
    "✅ Great job! You're managing your budget well."
  );

}

if (aiInsights.length === 0) {

  aiInsights.push(
    "Start adding transactions to unlock AI insights."
  );

}
 return (

<div className="dashboard-layout">

  <Sidebar />

  <div className="dashboard-main">

  <Navbar
  onAddTransaction={() => {
    console.log("Button Clicked");
    setEditingTransaction(null);
    setShowTransactionModal(true);
  }}
/>

    <div className="dashboard-wrapper">
<BudgetCard
  accounts={accounts}
  transactions={transactions}
  onManageBudget={() =>
    setShowBudgetModal(true)
  }
/>


<section className="summary-row">


<TotalBalanceCard
  totalBalance={totalBalance}
/>


<AccountsSection

accounts={accounts}

transactions={transactions}

totalBalance={totalBalance}

onAddAccount={() => setShowAddAccount(true)}

onEditAccount={setEditingAccount}

onDeleteAccount={deleteAccount}

/>


</section>

<section className="dashboard-trend-card">
<div className="trend-header">

    <div>

        <h2>Spending Trend</h2>

        <p>
            Visualize your expenses over time
        </p>

    </div>

    <div className="trend-tabs">

        <button
            className={trendView === "Week" ? "active" : ""}
            onClick={() => setTrendView("Week")}
        >
            Week
        </button>

        <button
            className={trendView === "Month" ? "active" : ""}
            onClick={() => setTrendView("Month")}
        >
            Month
        </button>

        <button
            className={trendView === "Year" ? "active" : ""}
            onClick={() => setTrendView("Year")}
        >
            Year
        </button>

    </div>

</div>

  <SpendingTrendChart
    transactions={transactions}
    trendView={trendView}
/>

</section>
<RecentTransactions
  transactions={transactions}
  onEdit={(t) => {
    setEditingTransaction(t);
    setShowTransactionModal(true);
  }}
  onDelete={deleteTransaction}
  onViewAll={() => navigate("/transactions")}
/>
<ManageBudgetModal
  open={showBudgetModal}
  accounts={accounts}
  onClose={() => setShowBudgetModal(false)}
  onSave={(updatedAccounts) => {
    setAccounts(updatedAccounts);
    localStorage.setItem(
      "accounts",
      JSON.stringify(updatedAccounts)
    );
    setShowBudgetModal(false);
  }}
/>


<DashboardFooter/>
   
{showTransactionModal && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 99999,
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: 30,
        borderRadius: 20,
      }}
    >
    

      <TransactionForm
        accounts={accounts}
        editingTransaction={editingTransaction}
        onAdd={addTransaction}
        onUpdate={updateTransaction}
        onClose={() => {
          setShowTransactionModal(false);
          setEditingTransaction(null);
        }}
      />
    </div>
  </div>
)}
  
{showAddAccount && (
  <>
    {console.log("Modal opened")}
    <AddAccountModal
      onClose={() => setShowAddAccount(false)}
      onCreate={(newAccount) => {
        setAccounts((prev) => [...prev, newAccount]);
        setShowAddAccount(false);
      }}
    />
  </>
)}
{editingAccount && (
  <EditAccountModal
    account={editingAccount}
    onClose={() => setEditingAccount(null)}
    onSave={updateAccount}
  />
)}





    </div>

  </div>

</div>

);
}

export default Dashboard;