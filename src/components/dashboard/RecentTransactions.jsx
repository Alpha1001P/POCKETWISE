import { useState, useEffect } from "react";
import "../dashboard/RecentTransactions.css";

function RecentTransactions({
  transactions,
  onEdit,
  onDelete,
  onViewAll
}) {

  const [openMenu, setOpenMenu] = useState(null);


  useEffect(() => {

    function closeMenu() {
      setOpenMenu(null);
    }

    document.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener(
        "click",
        closeMenu
      );
    };

  }, []);


  const recentTransactions = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )
    .slice(0, 5);


  function getCategoryIcon(item) {

    if (item.type === "Income")
      return "💰";

    switch (item.category) {

      case "Food":
        return "🍔";

      case "Shopping":
        return "🛍️";

      case "Transport":
        return "🚕";

      case "Healthcare":
        return "🏥";

      case "Mobile":
        return "📱";

      default:
        return "📄";
    }
  }


  function getDateLabel(date) {

    const today = new Date();

    const transactionDate =
      new Date(date);

    const diff =
      Math.floor(
        (today - transactionDate) /
        (1000 * 60 * 60 * 24)
      );

    if (diff === 0)
      return "Today";

    if (diff === 1)
      return "Yesterday";

    return transactionDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short"
      }
    );
  }


  return (

    <section className="recent-transactions-card">


      {/* HEADER */}

      <div className="recent-header">

        <div>

          <h2>
            Recent Transactions
          </h2>

          <p>
            Your latest activity
          </p>

        </div>


        <button
          className="view-all-btn"
          onClick={onViewAll}
        >
          See All →
        </button>

      </div>


      {/* TRANSACTIONS */}

      {recentTransactions.length === 0 ? (

        <div className="empty-transactions">

          <div className="empty-icon">
            💸
          </div>

          <h3>
            No Transactions Yet
          </h3>

          <p>
            Start adding your expenses and income.
          </p>

        </div>

      ) : (

        <div className="transaction-list">

          {recentTransactions.map(
            (item, index) => (

              <div
                key={item.id}

                className={
                  openMenu === item.id
                    ? "transaction-item menu-open"
                    : "transaction-item"
                }

                style={{
                  zIndex:
                    openMenu === item.id
                      ? 9999
                      : 1
                }}
              >


                {/* LEFT */}

                <div className="transaction-left">

                  <div className="transaction-avatar">

                    {getCategoryIcon(item)}

                  </div>


                  <div className="transaction-details">

                    <h4>
                      {item.title}
                    </h4>

                    <p>
                      {item.category}
                      {" • "}
                      {item.account}
                    </p>

                  </div>

                </div>


                {/* RIGHT */}

                <div className="transaction-right">

                  <span
                    className={
                      item.type === "Income"
                        ? "amount income"
                        : "amount expense"
                    }
                  >

                    {item.type === "Income"
                      ? "+"
                      : "-"
                    }

                    ₹
                    {Number(
                      item.amount
                    ).toLocaleString("en-IN")}

                  </span>


                  <div className="transaction-meta">

                    <small>
                      {getDateLabel(item.date)}
                    </small>


                    <div className="menu-wrapper">

                      <button
                        className="menu-btn"
                        onClick={(e) => {

                          e.stopPropagation();

                          setOpenMenu(
                            openMenu === item.id
                              ? null
                              : item.id
                          );

                        }}
                      >
                        ⋮
                      </button>


                      {openMenu === item.id && (

                        <div
                          className={
                            index >=
                            recentTransactions.length - 3
                              ? "menu-dropdown top"
                              : "menu-dropdown bottom"
                          }

                          onClick={(e) =>
                            e.stopPropagation()
                          }
                        >

                          <button
                            onClick={() => {

                              setOpenMenu(null);

                              onEdit(item);

                            }}
                          >
                            ✏️ Edit
                          </button>


                          <button
                            onClick={() => {

                              setOpenMenu(null);

                              onDelete(item.id);

                            }}
                          >
                            🗑 Delete
                          </button>

                        </div>

                      )}

                    </div>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </section>
  );
}

export default RecentTransactions;