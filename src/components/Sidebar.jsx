import { NavLink } from "react-router-dom";

function Sidebar() {


  const menuItems = [


    {
      name:"Dashboard",
      icon:"🏠",
      path:"/",
    },


    {
      name:"Transaction Management",
      icon:"💳",
      path:"/transactions",
    },


    {
      name:"Reports",
      icon:"📊",
      path:"/reports",
    },


    {
      name:"Calendar",
      icon:"📅",
      path:"/calendar",
    },

    {
      name:"Settings",
      icon:"⚙️",
      path:"/settings",
    },


  ];





  return (
<aside className="sidebar">

  <div className="sidebar-top">

    <div className="logo">
      💰 PocketWise
    </div>

    <nav>

      {menuItems.map((item) => (

        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/"}
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >

          <span className="sidebar-icon">
            {item.icon}
          </span>

          <span className="sidebar-text">
            {item.name}
          </span>

        </NavLink>

      ))}

    </nav>

  </div>

  <div className="sidebar-profile">

    <div className="profile-avatar">
      S
    </div>

    <div className="profile-info">

      <h4>Logged-in User</h4>

      <p>Student Edition</p>

    </div>

  </div>

</aside>

  );


}


export default Sidebar;