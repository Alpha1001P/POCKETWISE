import { generateInsights } from "../utils/aiInsights";


function AIInsights({
  transactions
}) {


  const insights =
    generateInsights(
      transactions
    );


  return (

    <div className="ai-card">

      <h2>
        💡 AI Insights
      </h2>


      {
        insights.map(
          (item,index)=>(

            <div
              key={index}
              className="insight-item"
            >

              {item}

            </div>

          )
        )
      }


    </div>

  );

}


export default AIInsights;