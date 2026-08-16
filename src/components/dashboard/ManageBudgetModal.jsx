import { useEffect, useState } from "react";
import "./ManageBudgetModal.css";

function ManageBudgetModal({
  open,
  accounts,
  onClose,
  onSave,
}) {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    setBudgets(
      accounts.map((a) => ({
        ...a,
        monthlyBudget: a.monthlyBudget || 0,
      }))
    );
  }, [accounts]);

  if (!open) return null;

  function updateBudget(id, value) {
    setBudgets((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              monthlyBudget: Number(value),
            }
          : a
      )
    );
  }

  return (
    <div className="budget-modal-overlay">

      <div className="budget-modal">

        <div className="budget-modal-header">

          <h2>
            Manage Monthly Budgets
          </h2>

          <button onClick={onClose}>
            ✕
          </button>

        </div>

        <div className="budget-list">

          {budgets.map((account) => (

            <div
              key={account.id}
              className="budget-item"
            >

              <div>

                <h4>
                  {account.icon} {account.name}
                </h4>

                <small>
                  Monthly Budget
                </small>

              </div>

              <input
                type="number"
                value={account.monthlyBudget}
                onChange={(e) =>
                  updateBudget(
                    account.id,
                    e.target.value
                  )
                }
              />

            </div>

          ))}

        </div>

        <div className="budget-modal-footer">

          <button
            className="cancel-budget"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-budget"
            onClick={() => onSave(budgets)}
          >
            Save Budgets
          </button>

        </div>

      </div>

    </div>
  );
}

export default ManageBudgetModal;