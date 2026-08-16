import { useEffect, useState } from "react";
import "../styles/navbar.css";
import {
  getNotifications,
  markAllRead,
  clearNotifications,
} from "../utils/notifications";

function Navbar({ onAddTransaction }) {

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  function loadNotifications() {
    setNotifications(getNotifications());
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  const unread = notifications.filter(
    (item) => !item.read
  ).length;

  function readAll() {
    markAllRead();
    loadNotifications();
  }

  function clearAll() {
    clearNotifications();
    loadNotifications();
  }

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <header className="navbar">
<div className="navbar-left">

  <div>

    <h1 className="navbar-title">
      {greeting} 👋
    </h1>

    <p className="navbar-subtitle">
      Welcome back! Manage your finances smarter.
    </p>

  </div>

</div>

      <div className="navbar-right">
<button
  type="button"
  className="add-transaction-btn"
  onClick={() => {
    console.log("Navbar clicked");
    console.log(onAddTransaction);

    if (typeof onAddTransaction === "function") {
      onAddTransaction();
    } else {
      console.log("onAddTransaction is NOT a function");
    }
  }}
>
  + Add Transaction
</button>

        {/* Notifications */}

        <div className="notification-wrapper">

          <button
            className="notification-button"
            onClick={() => setOpen(!open)}
          >
            🔔

            {unread > 0 && (
              <span className="notification-badge">
                {unread}
              </span>
            )}
          </button>

          {open && (

            <div className="notification-box">

              <div className="notification-top">

                <h3>
                  Notifications
                </h3>

                {notifications.length > 0 && (
                  <button onClick={readAll}>
                    Mark Read
                  </button>
                )}

              </div>

              {notifications.length === 0 ? (

                <p className="empty-notification">
                  No notifications yet
                </p>

              ) : (

                notifications.map((item) => (

                  <div
                    key={item.id}
                    className={
                      item.read
                        ? "notification-item"
                        : "notification-item unread"
                    }
                  >

                    <strong>{item.title}</strong>

                    <p>{item.message}</p>

                    <small>{item.date}</small>

                  </div>

                ))

              )}

              {notifications.length > 0 && (

                <button
                  className="clear-notification"
                  onClick={clearAll}
                >
                  🗑 Clear All
                </button>

              )}

            </div>

          )}

        </div>

    

      </div>

    </header>
  );
}

export default Navbar;