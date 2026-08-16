function AccountMenu({
  onEdit,
  onManageBudget,
  onDelete,
}) {
  return (
    <div className="account-popup">

      <button
        type="button"
        className="edit-option"
        onClick={onEdit}
      >
        <span>✏️</span>
        <span>Edit Account</span>
      </button>

      <button
        type="button"
        className="budget-option"
        onClick={onManageBudget}
      >
        <span>📊</span>
        <span>Manage Budget</span>
      </button>

      <button
        type="button"
        className="delete-option"
        onClick={onDelete}
      >
        <span>🗑️</span>
        <span>Delete Account</span>
      </button>

    </div>
  );
}

export default AccountMenu;