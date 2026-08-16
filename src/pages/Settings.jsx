import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


function Settings(){


const [currency,setCurrency] = useState(
localStorage.getItem("currency") || "INR"
);



const [notifications,setNotifications] = useState(
localStorage.getItem("notifications") !== "false"
);



const [profile,setProfile] = useState({

name:
localStorage.getItem("profileName") || "Sajan Kumar",

email:
localStorage.getItem("profileEmail") || "student@pocketwise.com"

});



const [editing,setEditing] = useState(false);





function saveProfile(){

localStorage.setItem(
"profileName",
profile.name
);


localStorage.setItem(
"profileEmail",
profile.email
);


setEditing(false);

}






function changeCurrency(value){

setCurrency(value);

localStorage.setItem(
"currency",
value
);

}





function changeNotifications(value){

setNotifications(value);

localStorage.setItem(
"notifications",
value
);

}





function resetData(){

const confirmDelete =
window.confirm(
"Are you sure you want to delete all PocketWise data?"
);



if(confirmDelete){

localStorage.clear();

alert(
"All data deleted successfully"
);

window.location.reload();

}

}







function exportCSV(){

const transactions =
JSON.parse(
localStorage.getItem("transactions")
)
||[];



if(transactions.length===0){

alert(
"No transactions available"
);

return;

}



const headers =
Object.keys(
transactions[0]
);



const csv = [

headers.join(","),

...transactions.map(row=>

headers.map(
field=>row[field]
).join(",")

)

].join("\n");




const blob =
new Blob(
[csv],
{
type:"text/csv"
}
);



const url =
URL.createObjectURL(blob);



const link =
document.createElement("a");


link.href=url;


link.download =
"PocketWise_Transactions.csv";


link.click();

}







return(


<div className="dashboard-layout">


<Sidebar/>


<div className="main-area">


<Navbar/>



<main className="dashboard-content">



<div className="settings-header">


<h1>
⚙️ Settings
</h1>


<p>
Manage your PocketWise preferences
</p>


</div>






<div className="settings-container">







{/* PROFILE */}


<div className="settings-card profile-card">


<h2>
👤 Profile
</h2>



{!editing ? (

<>


<div className="profile-box">


<div className="profile-avatar">

{profile.name.charAt(0).toUpperCase()}

</div>



<div className="profile-info">


<h3>
{profile.name}
</h3>


<p>
Student Account
</p>


<p>
{profile.email}
</p>


</div>


</div>



<button

className="settings-btn"

onClick={()=>
setEditing(true)
}

>

Edit Profile

</button>


</>


) : (


<>


<div className="profile-inputs">


<label>
Name
</label>


<input

className="settings-input"

value={profile.name}

onChange={(e)=>

setProfile({

...profile,

name:e.target.value

})

}

/>




<label>
Email
</label>


<input

className="settings-input"

value={profile.email}

onChange={(e)=>

setProfile({

...profile,

email:e.target.value

})

}

/>



</div>




<button

className="settings-btn"

onClick={saveProfile}

>

Save Changes

</button>


</>


)}



</div>










{/* CURRENCY */}


<div className="settings-card">


<h2>
💱 Currency
</h2>



<div className="setting-item">


<div className="setting-left">


<div className="setting-icon">
₹
</div>



<div>

<strong>
Default Currency
</strong>


<p>
Used for all transactions
</p>


</div>


</div>





<select

className="settings-select"

value={currency}

onChange={(e)=>

changeCurrency(
e.target.value
)

}

>


<option value="INR">
🇮🇳 ₹ Indian Rupee
</option>


<option value="USD">
🇺🇸 $ US Dollar
</option>


<option value="EUR">
🇪🇺 € Euro
</option>


<option value="GBP">
🇬🇧 £ Pound
</option>


</select>



</div>



</div>









{/* NOTIFICATIONS */}



<div className="settings-card">


<h2>
🔔 Notifications
</h2>



<div className="setting-item">



<div className="setting-left">


<div className="setting-icon">
🔔
</div>



<div>


<strong>
Budget Alerts
</strong>


<p>
Expense reminders and alerts
</p>


</div>


</div>





<label className="toggle">


<input

type="checkbox"

checked={notifications}

onChange={(e)=>

changeNotifications(
e.target.checked
)

}

/>


<span></span>


</label>



</div>



</div>









{/* EXPORT */}


<div className="settings-card">


<h2>
📤 Data Export
</h2>



<div className="setting-item">


<div className="setting-left">


<div className="setting-icon">
📄
</div>



<div>


<strong>
Transaction Backup
</strong>


<p>
Download your CSV report
</p>


</div>


</div>


</div>



<button

className="settings-btn export-btn"

onClick={exportCSV}

>

Export CSV

</button>



</div>









{/* ABOUT */}



<div className="settings-card">


<h2>
ℹ️ About PocketWise
</h2>



<div className="about-item">

<span>
Version
</span>

<span>
1.0
</span>

</div>



<div className="about-item">

<span>
Built With
</span>

<span>
React + Vite
</span>

</div>



<div className="about-item">

<span>
Purpose
</span>

<span>
Student Finance
</span>

</div>



</div>










{/* RESET */}


<div className="settings-card">


<h2>
🗑 Danger Zone
</h2>



<p>
Delete accounts and transactions permanently
</p>



<button

className="settings-btn reset-btn"

onClick={resetData}

>

Reset All Data

</button>



</div>






</div>



</main>


</div>


</div>


);


}


export default Settings;