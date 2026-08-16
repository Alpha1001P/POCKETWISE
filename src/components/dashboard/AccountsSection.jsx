import DashboardAccountCard from "./DashboardAccountCard";

function AccountsSection({
  accounts,
  transactions,
  totalBalance,
  onAddAccount,
  onEditAccount,
  onDeleteAccount
}) {
  return (
    <section className="accounts-section">


      {accounts.map((account) => (
        <DashboardAccountCard
          key={account.id}
          type="account"
          account={account}
          transactions={transactions}
          onEdit={onEditAccount}
          onDelete={onDeleteAccount}
        />
      ))}

      {accounts.length < 3 && (
        <div
          className="dashboard-add-account-card"
          onClick={onAddAccount}
        >
          <div className="add-account-icon">
            +
          </div>

          <h3>Add Account</h3>

          <p>
            Create a new account
          </p>
        </div>
      )}

    </section>
  );
}

export default AccountsSection;