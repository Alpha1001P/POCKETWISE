import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import TransactionManagement from "./pages/TransactionManagement";


import {
  Routes,
  Route
} from "react-router-dom";



function App(){


return(

<Routes>


<Route
path="/"
element={<Dashboard />}
/>


<Route
path="/transactions"
element={<TransactionManagement />}
/>


<Route
path="/reports"
element={<Reports />}
/>


<Route
path="/calendar"
element={<Calendar />}
/>




<Route
path="/settings"
element={<Settings />}
/>


</Routes>

);


}


export default App;