import { useState } from "react";

const icons = ["💵", "🏦", "📱", "💳", "💰", "🏛️"];

function AddAccountModal({
  onClose,
  onCreate,
}) {

  const [name, setName] = useState("");

  const [icon, setIcon] = useState("💵");

  function handleSubmit(e) {

    e.preventDefault();

    if (!name.trim()) return;

    onCreate({
      id: Date.now(),
      name,
      icon,
    });

    onClose();

  }

  return (

    <div className="modal-overlay">

      <div className="account-modal">

        <h2>

          Add New Account

        </h2>

        <form onSubmit={handleSubmit}>

          <label>

            Account Name

          </label>

          <input

            type="text"

            placeholder="e.g. SBI Savings"

            value={name}

            onChange={(e)=>setName(e.target.value)}

          />

          <label>

            Choose Icon

          </label>

          <div className="icon-grid">

            {icons.map((item)=>(

              <button

                type="button"

                key={item}

                className={
                  icon===item
                  ?
                  "icon-btn active-icon"
                  :
                  "icon-btn"
                }

                onClick={()=>setIcon(item)}

              >

                {item}

              </button>

            ))}

          </div>

          <div className="modal-actions">

            <button

              type="button"

              className="cancel-btn"

              onClick={onClose}

            >

              Cancel

            </button>

            <button

              type="submit"

              className="create-btn"

            >

              Create Account

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default AddAccountModal;