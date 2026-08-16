import "./TotalBalanceCard.css";
function TotalBalanceCard({ totalBalance }) {

  return (

    <div className="total-balance-card">


      <div className="balance-top">


        <div className="balance-icon">
          💰
        </div>


        <span className="balance-live">
          ● Updated Live
        </span>


      </div>




      <div className="balance-content">


        <p className="balance-label">
          Total Net Worth
        </p>


        <h2 className="balance-amount">
          ₹{Number(totalBalance).toLocaleString("en-IN")}
        </h2>


        <p className="balance-description">
          Across all your accounts
        </p>


      </div>



    </div>

  );

}


export default TotalBalanceCard;