import { useState, useEffect } from "react";

function TransactionForm({
  onAdd,
  onUpdate,
  editingTransaction,
  accounts,
  onClose
}) {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Expense");

  const [account, setAccount] = useState(
    accounts[0]?.name || "Cash Wallet"
  );

  const [showSuccess, setShowSuccess] = useState(false);

  /* =========================
     BUDGET STATE
  ========================= */

  const [monthlyBudget, setMonthlyBudget] =
    useState(25000);

  const [currentExpense, setCurrentExpense] =
    useState(0);


  /* =========================
     LOAD BUDGET + EXPENSES
  ========================= */

  useEffect(() => {

    // Get monthly budget
    const storedBudget =
      Number(
        localStorage.getItem("monthlyBudget")
      ) || 25000;

    setMonthlyBudget(storedBudget);


    // Get transactions
    const transactions =
      JSON.parse(
        localStorage.getItem("transactions")
      ) || [];


    const now = new Date();


    // Calculate current month's expenses
    const expense =
      transactions
        .filter((transaction) => {

          if (
            transaction.type !== "Expense"
          ) {
            return false;
          }

          const transactionDate =
            new Date(transaction.date);

          return (
            transactionDate.getMonth() ===
              now.getMonth() &&
            transactionDate.getFullYear() ===
              now.getFullYear()
          );

        })
        .reduce(
          (sum, transaction) =>
            sum + Number(transaction.amount),
          0
        );


    setCurrentExpense(expense);

  }, []);


  /* =========================
     EDIT TRANSACTION
  ========================= */

  useEffect(() => {

    if (editingTransaction) {

      setTitle(
        editingTransaction.title
      );

      setAmount(
        editingTransaction.amount
      );

      setCategory(
        editingTransaction.type ||
        "Expense"
      );

      setAccount(
        editingTransaction.account
      );

    }

  }, [editingTransaction]);


  /* =========================
     BUDGET CALCULATION
  ========================= */

  const enteredAmount =
    Number(amount) || 0;


  /*
    If the user is adding an expense,
    preview the budget AFTER this transaction.
  */

  const previewExpense =
    category === "Expense"
      ? currentExpense + enteredAmount
      : currentExpense;


  const remainingBudget =
    Math.max(
      monthlyBudget - previewExpense,
      0
    );


  const remainingPercentage =
    monthlyBudget > 0
      ? Math.round(
          (remainingBudget /
            monthlyBudget) *
            100
        )
      : 0;


  /* =========================
     BUDGET STATUS
  ========================= */

  let budgetStatus = "healthy";

  if (remainingPercentage <= 10) {

    budgetStatus = "danger";

  } else if (remainingPercentage <= 25) {

    budgetStatus = "warning";

  }


  /* =========================
     CATEGORY DETECTION
  ========================= */

  function detectCategory(title, type) {

    if (type === "Income")
      return "Income";


    const text =
      title.toLowerCase();


    if (
      text.includes("swiggy") ||
      text.includes("zomato") ||
      text.includes("food") ||
      text.includes("restaurant")
    )
      return "Food";


    if (
      text.includes("uber") ||
      text.includes("ola") ||
      text.includes("petrol") ||
      text.includes("fuel")
    )
      return "Transport";


    if (
      text.includes("amazon") ||
      text.includes("flipkart") ||
      text.includes("shopping")
    )
      return "Shopping";


    if (
      text.includes("recharge") ||
      text.includes("jio") ||
      text.includes("airtel")
    )
      return "Mobile";


    if (
      text.includes("medicine") ||
      text.includes("hospital")
    )
      return "Healthcare";


    return "Other";

  }


  /* =========================
     SUBMIT
  ========================= */

  function handleSubmit(e) {

    e.preventDefault();


    if (!title || !amount) {

      alert(
        "Please fill all details"
      );

      return;

    }


    const transactionType =
      category === "Income"
        ? "Income"
        : "Expense";


    const transaction = {

      id: editingTransaction
        ? editingTransaction.id
        : Date.now(),

      title: title.trim(),

      amount: Number(amount),

      type: transactionType,

      category: detectCategory(
        title,
        transactionType
      ),

      account,

      date: editingTransaction
        ? editingTransaction.date
        : new Date().toISOString(),

      pinned: editingTransaction
        ? editingTransaction.pinned
        : false

    };


    /* Save transaction */

    if (editingTransaction) {

      onUpdate(transaction);

    } else {

      onAdd(transaction);

    }


    /* Reset form */

    setTitle("");

    setAmount("");

    setCategory("Expense");

    setAccount(
      accounts[0]?.name ||
      "Cash Wallet"
    );


    setShowSuccess(true);


    setTimeout(() => {

      setShowSuccess(false);

      if (onClose) {

        onClose();

      }

    }, 1000);

  }


  return (

    <form
      className="transaction-form-card"
      onSubmit={handleSubmit}
    >


      {/* =========================
          HEADER
      ========================= */}

      <div className="form-header">

        <div>

          <h2>

            {editingTransaction
              ? "✏️ Edit Transaction"
              : "💸 Add Transaction"}

          </h2>


          <p>

            Record every income and expense quickly.

          </p>

        </div>


        {onClose && (

          <button
            type="button"
            className="close-form-btn"
            onClick={onClose}
          >

            ✕

          </button>

        )}

      </div>



      {/* =========================
          CIRCULAR BUDGET
      ========================= */}

      <div className="transaction-budget-widget">


        <div
          className={`budget-circle ${budgetStatus}`}
          style={{
            "--budget-progress":
              `${remainingPercentage * 3.6}deg`
          }}
        >

          <div className="budget-circle-inner">

            <strong>

              {remainingPercentage}%

            </strong>

            <span>

              Left

            </span>

          </div>

        </div>


        <div className="budget-info">

          <span className="budget-label">

            Monthly Budget

          </span>


          <h3>

            ₹
            {remainingBudget.toLocaleString(
              "en-IN"
            )}

          </h3>


          <p>

            {enteredAmount > 0 &&
            category === "Expense"
              ? "After this transaction"
              : "remaining"}

            {" "}from ₹
            {monthlyBudget.toLocaleString(
              "en-IN"
            )}

          </p>


          {category === "Expense" &&
            enteredAmount > 0 && (

            <small className="budget-preview">

              Including ₹
              {enteredAmount.toLocaleString(
                "en-IN"
              )}

            </small>

          )}

        </div>

      </div>



      {/* =========================
          TRANSACTION TYPE
      ========================= */}

      <div className="transaction-type-toggle">


        <button
          type="button"
          className={
            category === "Income"
              ? "active-income"
              : ""
          }
          onClick={() =>
            setCategory("Income")
          }
        >

          📈 Income

        </button>


        <button
          type="button"
          className={
            category === "Expense"
              ? "active-expense"
              : ""
          }
          onClick={() =>
            setCategory("Expense")
          }
        >

          📉 Expense

        </button>


      </div>



      {/* =========================
          FORM
      ========================= */}

      <div className="form-grid">


        <div className="form-full">

          <label>

            Transaction Title

          </label>


          <input
            placeholder="e.g. Swiggy, Salary, Shopping..."
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

        </div>



        <div>

          <label>

            Amount

          </label>


          <input
            type="number"
            placeholder="₹ 0"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />

        </div>



        <div>

          <label>

            Account

          </label>


          <select
            value={account}
            onChange={(e) =>
              setAccount(e.target.value)
            }
          >

            {accounts.map((item) => (

              <option
                key={item.id}
                value={item.name}
              >

                {item.icon} {item.name}

              </option>

            ))}

          </select>

        </div>


      </div>



      {/* =========================
          SUBMIT
      ========================= */}

      <button
        className="add-transaction-btn"
        type="submit"
      >

        {editingTransaction
          ? "Update Transaction"
          : "Add Transaction"}

      </button>



      {/* =========================
          SUCCESS
      ========================= */}

      {showSuccess && (

        <div className="success-toast">

          ✅ Transaction Saved Successfully

        </div>

      )}


    </form>

  );

}


export default TransactionForm;