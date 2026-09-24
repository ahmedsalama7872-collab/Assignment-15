// context/NotificationsContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const NotificationsContext = createContext(null);

export function NotificationsProvider({ children }) {
  const [counter, setCounter] = useState(0);

  const getNotCount = useCallback(async () => {
    const token = localStorage.getItem("userToken");
    if (!token) return;
    try {
      const { data } = await axios.get(
        "https://route-posts.routemisr.com/notifications/unread-count",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCounter(data.data?.unreadCount || 0);
    } catch (error) {
      console.log("Error fetching unread count:", error);
    }
  }, []);

  useEffect(() => {
    getNotCount();
  }, [getNotCount]);

  return (
    <NotificationsContext.Provider value={{ counter, getNotCount }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error("useNotifications must be used inside NotificationsProvider");
  }
  return ctx;
}