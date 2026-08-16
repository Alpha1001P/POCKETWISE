function DashboardAccountCard({
  type,
  icon,
  title,
  amount,
  account,
  transactions = [],
  onEdit,
  onDelete
}) {

  // Total Net Worth Card
  if (type === "balance") {
    return (
      <div className="dashboard-account-card net-worth-card">

        <div className="account-card-header">

          <div className="account-icon balance-icon">
            {icon}
          </div>

          <span>
            {title}
          </span>

        </div>

        <h2 className="account-balance">
          ₹{Number(amount).toLocaleString("en-IN")}
        </h2>

        <p className="account-subtitle">
          Across all accounts
        </p>

      </div>
    );
  }

  // Calculate account balance from transactions
  const accountBalance = transactions.reduce((total, t) => {

    if (t.account !== account.name) return total;

    return t.type === "Income"
      ? total + Number(t.amount)
      : total - Number(t.amount);

  }, 0);

  return (
    <div className="dashboard-account-card">

      <div className="account-card-header">

        <div className="account-icon">
          {account.icon || "🏦"}
        </div>

        <div className="account-title">

          <h3>{account.name}</h3>

          <p>{account.type || "Account"}</p>

        </div>

      </div>

      <h2 className="account-balance">
        ₹{accountBalance.toLocaleString("en-IN")}
      </h2>

      <div className="account-actions">

        <button onClick={() => onEdit(account)}>
          ✏️
        </button>

        <button onClick={() => onDelete(account.id)}>
          🗑️
        </button>

      </div>

    </div>
  );
}

export default DashboardAccountCard;