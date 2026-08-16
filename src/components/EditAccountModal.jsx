import "./EditAccountModal.css";
import { useState } from "react";


function EditAccountModal({
  account,
  onClose,
  onSave
}) {

  const [name,setName] = useState(account.name);


  return (

    <div className="modal-overlay">

      <div className="modal-box">

        <h2>
          Edit Account
        </h2>


        <input

          value={name}

          onChange={(e)=>setName(e.target.value)}

        />


        <div className="modal-actions">

          <button
            onClick={onClose}
          >
            Cancel
          </button>


          <button

            onClick={()=>{

              onSave({

                ...account,

                name:name

              });

            }}

          >
            Save
          </button>


        </div>


      </div>

    </div>

  );

}


export default EditAccountModal;