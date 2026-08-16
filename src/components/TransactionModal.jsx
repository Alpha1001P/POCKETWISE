import { useState } from "react";

import "../styles/modals.css";
import "./TransactionModal.css";


function TransactionModal({
  transaction,
  close,
  onEdit,
  onDelete,
  onPin,
  onDuplicate,
}) {


  const [editMode, setEditMode] =
    useState(false);


  const [title, setTitle] =
    useState(transaction.title);


  const [amount, setAmount] =
    useState(transaction.amount);


  const [type, setType] =
    useState(transaction.type);



  function handleSave(){


    if(!title.trim()){

      alert("Please enter transaction title");

      return;

    }


    if(Number(amount)<=0){

      alert("Amount must be greater than 0");

      return;

    }



    if(onEdit){

      onEdit({

        ...transaction,

        title:title.trim(),

        amount:Number(amount),

        type

      });

    }



    setEditMode(false);

    close();

  }





  return (

    <div
      className="modal-overlay"
      onClick={close}
    >


      <div

        className="transaction-modal"

        onClick={(e)=>
          e.stopPropagation()
        }

      >


      {

      editMode ?


      (

        <>


        <h2>
          ✏️ Edit Transaction
        </h2>



        <label>
          Title
        </label>


        <input

          value={title}

          onChange={(e)=>
            setTitle(e.target.value)
          }

        />




        <label>
          Amount
        </label>


        <input

          type="number"

          value={amount}

          onChange={(e)=>
            setAmount(e.target.value)
          }

        />





        <label>
          Type
        </label>


        <select

          value={type}

          onChange={(e)=>
            setType(e.target.value)
          }

        >

          <option value="Income">
            Income
          </option>


          <option value="Expense">
            Expense
          </option>


        </select>





        <div className="modal-actions">


          <button

            className="modal-save-btn"

            onClick={handleSave}

          >

            💾 Save Changes

          </button>




          <button

            className="modal-cancel-btn"

            onClick={()=>
              setEditMode(false)
            }

          >

            Cancel

          </button>


        </div>


        </>


      )


      :


      (

        <>


        <h2>
          Transaction Options
        </h2>




        <button

          className="modal-option"

          onClick={()=>
            setEditMode(true)
          }

        >

          ✏️ Edit Transaction

        </button>





        <button

          className="modal-option"

          onClick={()=>{


            if(onPin){

              onPin(transaction.id);

            }


            close();


          }}

        >

          {

          transaction.pinned

          ?

          "📌 Remove Pin"

          :

          "⭐ Pin Transaction"

          }


        </button>






        <button

          className="modal-option"

          onClick={()=>{


            if(onDuplicate){

              onDuplicate(transaction);

            }


            close();


          }}

        >

          📋 Duplicate Transaction

        </button>






        <button

          className="modal-delete"

          onClick={()=>{


            if(onDelete){

              onDelete(transaction.id);

            }


            close();


          }}

        >

          🗑 Delete Transaction

        </button>





        <button

          className="modal-cancel-btn"

          onClick={close}

        >

          Cancel

        </button>



        </>

      )

      }


      </div>


    </div>

  );

}


export default TransactionModal;