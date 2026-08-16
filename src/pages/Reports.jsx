import { useEffect, useMemo, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ExpensePieChart from "../components/charts/ExpensePieChart";

import "../styles/reports.css";


function Reports() {

  const [showTransactions, setShowTransactions] = useState(false);

  const [transactions, setTransactions] = useState([]);

  const [selectedDate, setSelectedDate] = useState(
    new Date()
  );

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("default", {
      month: "long"
    })
  );


  /* ==========================================
     LOAD TRANSACTIONS
  ========================================== */

  useEffect(() => {

    function loadTransactions() {

      const saved =
        JSON.parse(
          localStorage.getItem("transactions")
        ) || [];

      setTransactions(saved);

    }

    loadTransactions();

    window.addEventListener(
      "storage",
      loadTransactions
    );

    return () => {

      window.removeEventListener(
        "storage",
        loadTransactions
      );

    };

  }, []);


  /* ==========================================
     MONTHS
  ========================================== */

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];


  /* ==========================================
     DAILY TRANSACTIONS
  ========================================== */

  const dailyTransactions = transactions.filter((t) => {

    if (!t.date) return false;

    const transactionDate =
      new Date(t.date);

    return (
      transactionDate.getDate() ===
        selectedDate.getDate()
      &&
      transactionDate.getMonth() ===
        selectedDate.getMonth()
      &&
      transactionDate.getFullYear() ===
        selectedDate.getFullYear()
    );

  });


  /* ==========================================
     DAILY SPENDING
  ========================================== */

  const dailySpending =
    dailyTransactions.reduce(
      (sum, t) =>
        t.type === "Expense"
          ? sum + Number(t.amount || 0)
          : sum,
      0
    );


  /* ==========================================
     MONTH TRANSACTIONS
  ========================================== */

  const monthTransactions =
    useMemo(() => {

      return transactions.filter((item) => {

        if (!item.date) return false;

        const date =
          new Date(item.date);

        return (
          date.toLocaleString(
            "default",
            {
              month: "long"
            }
          ) === selectedMonth
        );

      });

    }, [
      transactions,
      selectedMonth
    ]);


  /* ==========================================
     TOTAL INCOME
  ========================================== */

  const totalIncome =
    monthTransactions.reduce(
      (sum, item) => {

        if (item.type === "Income") {

          return (
            sum +
            Number(item.amount || 0)
          );

        }

        return sum;

      },
      0
    );


  /* ==========================================
     TOTAL EXPENSE
  ========================================== */

  const totalExpense =
    monthTransactions.reduce(
      (sum, item) => {

        if (item.type === "Expense") {

          return (
            sum +
            Number(item.amount || 0)
          );

        }

        return sum;

      },
      0
    );


  /* ==========================================
     SAVINGS
  ========================================== */

  const savings =
    totalIncome - totalExpense;


  /* ==========================================
     SAVING RATE
  ========================================== */

  const savingRate =
    totalIncome === 0
      ? 0
      : (
          (savings / totalIncome) *
          100
        ).toFixed(1);


  /* ==========================================
     CATEGORY ANALYSIS
  ========================================== */

  const categoryTotals = {};

  monthTransactions
    .filter(
      item =>
        item.type === "Expense"
    )
    .forEach(item => {

      const key =
        item.category || "Other";

      categoryTotals[key] =
        (
          categoryTotals[key] || 0
        ) +
        Number(item.amount || 0);

    });


  const topCategories =
    Object.entries(categoryTotals)
      .sort(
        (a, b) =>
          b[1] - a[1]
      )
      .slice(0, 5);


  /* ==========================================
     HIGHEST CATEGORY
  ========================================== */

  const highestCategory =
    topCategories.length > 0
      ? topCategories[0]
      : null;


  /* ==========================================
     EXPENSE CATEGORY DATA
  ========================================== */

  const expenseTransactions =
    monthTransactions.filter(
      t =>
        t.type === "Expense"
    );


  const categoryCount =
    new Set(
      expenseTransactions.map(
        t =>
          t.category || "Other"
      )
    ).size;


  const categoryTotalExpenses =
    expenseTransactions.reduce(
      (sum, t) =>
        sum +
        Number(t.amount || 0),
      0
    );


  /* ==========================================
     DATE
  ========================================== */

  const formattedSelectedDate =
    selectedDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric"
      }
    );


  /* ==========================================
     CATEGORY ICONS
  ========================================== */

  const categoryIcons = {

    Food: "🍔",

    Travel: "✈️",

    Shopping: "🛍️",

    Education: "🎓",

    Entertainment: "🎮",

    Health: "❤️",

    Bills: "🧾",

    Salary: "💼",

    Pocket: "👛",

    Other: "📦"

  };


  return (

    <div className="dashboard-layout">


      {/* ==========================================
          SIDEBAR
      ========================================== */}

      <Sidebar />


      <div className="main-area">


        {/* ==========================================
            NAVBAR
        ========================================== */}

        <Navbar />


        <main className="reports-page">


          {/* ==========================================
              PAGE HEADER
          ========================================== */}

          <div className="reports-page-header">

            <div className="reports-title">

              <div className="reports-title-icon">
                📊
              </div>


              <div>

                <h1>
                  Reports & Analytics
                </h1>

                <p>
                  Understand your spending,
                  savings and financial habits.
                </p>

              </div>

            </div>

          </div>


          {/* ==========================================
              DAILY SPENDING
          ========================================== */}

          <section className="daily-card">

            <div className="daily-card-glow"></div>


            <div className="daily-header">

              <div>

                <span className="daily-label">
                  DAILY SPENDING
                </span>

                <h3>
                  {formattedSelectedDate}
                </h3>

              </div>


              <input
                type="date"
                className="date-btn"

                value={
                  selectedDate
                    .toISOString()
                    .split("T")[0]
                }

                onChange={(e) => {

                  if (!e.target.value)
                    return;

                  setSelectedDate(
                    new Date(
                      e.target.value +
                      "T00:00:00"
                    )
                  );

                }}

              />

            </div>


            <div className="daily-main">

              <div>

                <h1>
                  ₹
                  {dailySpending.toLocaleString(
                    "en-IN"
                  )}
                </h1>


                <p className="daily-subtitle">
                  Total expense for this day
                </p>

              </div>


              <button
                className="transaction-link"

                onClick={() =>
                  setShowTransactions(true)
                }

              >

                🧾

                <span>
                  {dailyTransactions.length}
                  {" "}
                  Transactions
                </span>

                <strong>
                  →
                </strong>

              </button>


            </div>

          </section>


          {/* ==========================================
              SUMMARY CARDS
          ========================================== */}

          <section className="report-summary-cards">


            {/* EXPENSE */}

            <div className="report-card spending-card">

              <div className="report-card-top">

                <div className="report-card-icon">
                  💸
                </div>

                <span>
                  Expenses
                </span>

              </div>


              <h2>
                ₹
                {totalExpense.toLocaleString(
                  "en-IN"
                )}
              </h2>


              <p>
                Total spending
              </p>

            </div>


            {/* INCOME */}

            <div className="report-card income-card">

              <div className="report-card-top">

                <div className="report-card-icon">
                  📈
                </div>

                <span>
                  Income
                </span>

              </div>


              <h2>
                ₹
                {totalIncome.toLocaleString(
                  "en-IN"
                )}
              </h2>


              <p>
                Total income
              </p>

            </div>


            {/* SAVINGS */}

            <div className="report-card savings-card">

              <div className="report-card-top">

                <div className="report-card-icon">
                  💰
                </div>

                <span>
                  Savings
                </span>

              </div>


              <h2>
                ₹
                {savings.toLocaleString(
                  "en-IN"
                )}
              </h2>


              <p>
                Money saved
              </p>

            </div>


            {/* SAVING RATE */}

            <div className="report-card rate-card">

              <div className="report-card-top">

                <div className="report-card-icon">
                  🎯
                </div>

                <span>
                  Saving Rate
                </span>

              </div>


              <h2>
                {savingRate}%
              </h2>


              <p>
                Income retained
              </p>

            </div>


          </section>


          {/* ==========================================
              ANALYTICS GRID
          ========================================== */}

          <div className="report-layout">


            {/* ========================================
                EXPENSE BY CATEGORY
            ======================================== */}
<div className="reports-expense-wrapper">

  <section className="expense-category-card">


    {/* =====================================================
        EXPENSE CATEGORY HEADER
    ===================================================== */}

    <div className="expense-category-header">

      <div className="expense-category-title">

        <div className="expense-category-icon">
          💸
        </div>

        <div>

          <span className="expense-category-label">
            SPENDING BREAKDOWN
          </span>

          <h2>
            Expense by Category
          </h2>

          <p>
            See where your money is going
          </p>

        </div>

      </div>


      {/* =================================================
          VIEWING MONTH
      ================================================= */}

      <div className="expense-category-viewing">

        <span>
          📅 Viewing
        </span>

        <select
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(e.target.value)
          }
        >

          {months.map(month => (

            <option
              key={month}
              value={month}
            >
              {month}
            </option>

          ))}

        </select>

      </div>

    </div>

                {/* HEADER */}

                <div className="expense-category-header">

                  <div className="expense-category-title">

                    <div className="expense-category-icon">
                      💸
                    </div>


                    <div>

                      <span className="expense-category-label">
                        SPENDING BREAKDOWN
                      </span>


                      <h2>
                        Expense by Category
                      </h2>


                      <p>
                        See where your money is going
                      </p>

                    </div>

                  </div>


                  <button
                    className="expense-category-action"
                    type="button"
                  >
                    View Details
                    <span>→</span>
                  </button>

                </div>


                {/* ========================================
                    CHART
                ======================================== */}

                <div className="expense-category-chart">

                  <div className="expense-chart-glow"></div>


                  <div className="expense-chart-inner">

                    <ExpensePieChart
                      transactions={
                        monthTransactions
                      }
                    />

                  </div>

                </div>


                {/* ========================================
                    FOOTER
                ======================================== */}

                <div className="expense-category-footer">


                  <div className="expense-footer-item">

                    <div className="expense-footer-icon category-icon">
                      📊
                    </div>


                    <div className="expense-footer-content">

                      <span>
                        Categories
                      </span>

                      <strong>
                        {categoryCount}
                      </strong>

                    </div>

                  </div>


                  <div className="expense-footer-divider"></div>


                  <div className="expense-footer-item">

                    <div className="expense-footer-icon money-icon">
                      💰
                    </div>


                    <div className="expense-footer-content">

                      <span>
                        Total Expenses
                      </span>

                      <strong>
                        ₹
                        {categoryTotalExpenses.toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                    </div>

                  </div>


                </div>


              </section>

            </div>


            {/* ========================================
                CATEGORY ANALYSIS
            ======================================== */}

            <section className="chart-card category-analysis-card">


              <div className="category-analysis-header">

                <div>

                  <span className="chart-small-label">
                    TOP CATEGORIES
                  </span>


                  <h2>
                    Category Analysis
                  </h2>

                </div>


                <div className="category-header-icon">
                  📊
                </div>

              </div>


              {topCategories.length === 0 ? (

                <div className="empty-category">

                  <div className="empty-category-icon">
                    📊
                  </div>


                  <h3>
                    No expense data
                  </h3>


                  <p>
                    Add expenses to see your
                    spending categories.
                  </p>

                </div>

              ) : (

                <div className="category-list">

                  {topCategories.map(
                    (item, index) => {

                      const percentage =
                        totalExpense > 0
                          ? (
                              item[1] /
                              totalExpense
                            ) * 100
                          : 0;


                      return (

                        <div
                          key={item[0]}
                          className="category-item"
                        >


                          <div className="category-item-top">


                            <div className="category-left">

                              <div
                                className={
                                  `category-icon category-color-${index}`
                                }
                              >

                                {
                                  categoryIcons[
                                    item[0]
                                  ] || "📦"
                                }

                              </div>


                              <div className="category-info">

                                <strong>
                                  {item[0]}
                                </strong>


                                <small>
                                  {percentage.toFixed(1)}%
                                  {" "}
                                  of spending
                                </small>

                              </div>

                            </div>


                            <div className="category-value">

                              <strong className="category-amount">

                                ₹
                                {item[1].toLocaleString(
                                  "en-IN"
                                )}

                              </strong>

                            </div>


                          </div>


                          <div className="category-progress">

                            <div
                              className={
                                `category-progress-bar category-progress-${index}`
                              }

                              style={{
                                width:
                                  `${Math.min(
                                    percentage,
                                    100
                                  )}%`
                              }}

                            />

                          </div>


                        </div>

                      );

                    }
                  )}

                </div>

              )}


            </section>


          </div>


          {/* ==========================================
              AI INSIGHTS
          ========================================== */}

          <section className="ai-insights-card">


            <div className="ai-insights-header">

              <div className="ai-icon">
                🤖
              </div>


              <div>

                <span>
                  POCKETWISE AI
                </span>


                <h2>
                  Spending Insights
                </h2>

              </div>

            </div>


            {totalExpense === 0 ? (

              <div className="insight-empty">

                <p>
                  Add some transactions to unlock
                  your personalized spending insights.
                </p>

              </div>

            ) : (

              <div className="insight-grid">


                <div className="insight-box">

                  <span>
                    💸 Total Spending
                  </span>


                  <strong>
                    ₹
                    {totalExpense.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>


                <div className="insight-box">

                  <span>
                    💰 Total Savings
                  </span>


                  <strong>
                    ₹
                    {savings.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>


                <div className="insight-box">

                  <span>
                    📊 Saving Rate
                  </span>


                  <strong>
                    {savingRate}%
                  </strong>

                </div>


                {highestCategory && (

                  <div className="insight-box">

                    <span>
                      🔥 Highest Category
                    </span>


                    <strong>
                      {highestCategory[0]}
                    </strong>

                  </div>

                )}


                {Number(savingRate) < 20 && (

                  <div className="ai-warning">

                    ⚠️ Your saving rate is low.
                    Try reducing unnecessary expenses.

                  </div>

                )}


                {Number(savingRate) >= 20 && (

                  <div className="ai-success">

                    ✨ Great job! You're maintaining
                    a healthy saving rate.

                  </div>

                )}


              </div>

            )}


          </section>


          {/* ==========================================
              DAILY TRANSACTIONS POPUP
          ========================================== */}

          {showTransactions && (

            <div
              className="transaction-overlay"

              onClick={() =>
                setShowTransactions(false)
              }

            >

              <div
                className="transaction-popup"

                onClick={(e) =>
                  e.stopPropagation()
                }

              >

                <button
                  className="close-popup"

                  onClick={() =>
                    setShowTransactions(false)
                  }

                >
                  ✖
                </button>


                <div className="popup-header">

                  <div className="popup-icon">
                    🧾
                  </div>


                  <div>

                    <h2>
                      Daily Transactions
                    </h2>


                    <p>
                      {formattedSelectedDate}
                    </p>

                  </div>

                </div>


                {dailyTransactions.length === 0 ? (

                  <div className="popup-empty">

                    <div>
                      💸
                    </div>


                    <p>
                      No transactions on this date.
                    </p>

                  </div>

                ) : (

                  <div className="popup-list">

                    {dailyTransactions.map(
                      (t, index) => (

                        <div
                          className="popup-item"
                          key={t.id || index}
                        >


                          <div className="popup-item-left">

                            <div className="popup-item-icon">

                              {t.type === "Expense"
                                ? "💸"
                                : "💰"
                              }

                            </div>


                            <div>

                              <strong>
                                {t.category || "Other"}
                              </strong>


                              <p>
                                {
                                  t.note ||
                                  t.title ||
                                  "No note"
                                }
                              </p>

                            </div>

                          </div>


                          <strong
                            className={
                              t.type === "Expense"
                                ? "expense-text"
                                : "income-text"
                            }
                          >

                            {t.type === "Expense"
                              ? "-"
                              : "+"
                            }

                            ₹
                            {Number(
                              t.amount || 0
                            ).toLocaleString(
                              "en-IN"
                            )}

                          </strong>


                        </div>

                      )
                    )}

                  </div>

                )}


              </div>

            </div>

          )}


        </main>

      </div>

    </div>

  );

}


export default Reports;