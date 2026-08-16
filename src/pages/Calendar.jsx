import { useState, useMemo } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


function Calendar() {


  const [transactions] = useState(()=>{

    return JSON.parse(
      localStorage.getItem("transactions")
    ) || [];

  });



  const [selectedDate,setSelectedDate] =
    useState(
      new Date()
    );





  const year =
    selectedDate.getFullYear();



  const month =
    selectedDate.getMonth();





  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate();





  const monthName =
    selectedDate.toLocaleString(
      "default",
      {
        month:"long"
      }
    );







  const dailyTransactions = useMemo(()=>{


    return transactions.filter((item)=>{


      const date =
        new Date(item.date);



      return (

        date.getDate()
        ===
        selectedDate.getDate()

        &&

        date.getMonth()
        ===
        selectedDate.getMonth()

        &&

        date.getFullYear()
        ===
        selectedDate.getFullYear()

      );


    });


  },[transactions,selectedDate]);







  const totalIncome =
    dailyTransactions.reduce(
      (sum,item)=>{

        if(item.type==="Income")

          return sum + Number(item.amount);


        return sum;


      },0
    );





  const totalExpense =
    dailyTransactions.reduce(
      (sum,item)=>{

        if(item.type==="Expense")

          return sum + Number(item.amount);


        return sum;


      },0
    );








  return (

    <div className="dashboard-layout">


      <Sidebar />


      <div className="main-area">


        <Navbar />



        <main className="dashboard-content">



          <div className="dashboard-header">

            <div>

              <h1>
                📅 Calendar View
              </h1>

              <p>
                Track your spending on any day.
              </p>

            </div>

          </div>







          <div className="summary-card">


            <h2>

              {monthName} {year}

            </h2>



            <input

              type="date"

              value={
                selectedDate
                .toISOString()
                .split("T")[0]
              }

              onChange={(e)=>
                setSelectedDate(
                  new Date(e.target.value)
                )
              }

            />


          </div>








          <div className="report-summary-cards">



            <div className="report-card">

              <div className="report-card-title">
                📈 Income
              </div>

              <h2>
                ₹{totalIncome}
              </h2>

            </div>





            <div className="report-card">

              <div className="report-card-title">
                📉 Expense
              </div>

              <h2>
                ₹{totalExpense}
              </h2>

            </div>





            <div className="report-card">

              <div className="report-card-title">
                💰 Balance
              </div>

              <h2>
                ₹{totalIncome-totalExpense}
              </h2>

            </div>



          </div>








          <div className="chart-card">


            <h2>
              Transactions
            </h2>




            {

            dailyTransactions.length===0

            ?

            <p>
              No transactions on this date.
            </p>


            :


            [...dailyTransactions]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map((item) => (


              <div

              className="transaction-card"

              key={item.id}

              >


                <div>

                  <h3>
                    {item.title}
                  </h3>


                  <p>
                    {item.account}
                    {" • "}
                    {item.category}
                  </p>


                </div>




                <h3>

                {

                  item.type==="Income"

                  ?

                  `+₹${item.amount}`

                  :

                  `-₹${item.amount}`

                }

                </h3>


              </div>


            ))


            }



          </div>





        </main>


      </div>


    </div>

  );


}


export default Calendar;