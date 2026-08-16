import { useState } from "react";
import "./TransactionCard.css";

import TransactionModal from "./TransactionModal";
import "../styles/transactions.css";

function TransactionCard({
  transaction,
  refreshTransactions
}) {


  const [open, setOpen] = useState(false);



  const formattedDate =
    new Date(transaction.date)
    .toLocaleString("en-IN", {

      day:"2-digit",
      month:"short",
      year:"numeric",
      hour:"2-digit",
      minute:"2-digit",

    });



  const categoryIcons = {

    Food: "🍔",
    Travel: "✈️",
    Shopping: "🛍️",
    Education: "🎓",
    Entertainment: "🎮",
    Health: "❤️",
    Bills:"🧾",
    Salary:"💼",
    Pocket:"👛",
    Other:"📦",

  };



  function updateTransactions(updatedData){


    localStorage.setItem(

      "transactions",

      JSON.stringify(updatedData)

    );


    if(refreshTransactions){

      refreshTransactions();

    }


    setOpen(false);

  }





  function handleEdit(updatedTransaction){


    const data =
      JSON.parse(
        localStorage.getItem("transactions")
      ) || [];



    const updated = data.map((item)=>

      item.id === updatedTransaction.id

      ?

      updatedTransaction

      :

      item

    );



    updateTransactions(updated);


  }





  function handleDelete(id){


    const data =
      JSON.parse(
        localStorage.getItem("transactions")
      ) || [];



    const updated =
      data.filter(
        (item)=>item.id !== id
      );



    updateTransactions(updated);


  }





  function handlePin(id){


    const data =
      JSON.parse(
        localStorage.getItem("transactions")
      ) || [];



    const updated = data.map((item)=>

      item.id === id

      ?

      {

        ...item,

        pinned:!item.pinned

      }

      :

      item

    );



    updateTransactions(updated);


  }





  function handleDuplicate(transaction){


    const data =
      JSON.parse(
        localStorage.getItem("transactions")
      ) || [];



    const duplicate = {

      ...transaction,

      id:Date.now(),

      pinned:false

    };



    updateTransactions([

      duplicate,

      ...data

    ]);


  }





  return (

    <>


    <div className="transaction-card">



      <div className="transaction-left">


        <div

          className={

            `transaction-icon ${
              
              transaction.type === "Income"

              ?

              "income-icon"

              :

              "expense-icon"

            }`

          }

        >

          {
            categoryIcons[
              transaction.category
            ]

            ||

            "📦"
          }


        </div>





        <div className="transaction-details">


          <div className="transaction-top">


            <span

              className={

              `transaction-badge ${
                
                transaction.type === "Income"

                ?

                "income-badge"

                :

                "expense-badge"

              }`

              }

            >

              {transaction.type}


            </span>





            {
              transaction.pinned &&

              (

                <span className="pinned-chip">

                  ⭐ Pinned

                </span>

              )

            }


          </div>





          <h3>

            {transaction.title}

          </h3>





          <div className="transaction-meta">


            <span className="category-chip">
           </span>





            <span className="account-chip">


              💳 {transaction.account}


            </span>



          </div>





       <small className="transaction-date">

  📅 {formattedDate}

</small>




        </div>


      </div>





      <div className="transaction-right">



        <h2

          className={

          transaction.type === "Income"

          ?

          "income-text"

          :

          "expense-text"

          }

        >

          {
            transaction.type === "Income"

            ?

            "+"

            :

            "-"
          }

          ₹

          {

            Number(
              transaction.amount
            )
            .toLocaleString("en-IN")

          }


        </h2>





        <button

          className="menu-btn"

          onClick={()=>setOpen(true)}

        >

          ⋮


        </button>



      </div>




    </div>






    {
      open &&

      (

      <TransactionModal

        transaction={transaction}

        close={()=>setOpen(false)}

        onEdit={handleEdit}

        onDelete={handleDelete}

        onPin={handlePin}

        onDuplicate={handleDuplicate}

      />

      )

    }



    </>

  );

}


export default TransactionCard;