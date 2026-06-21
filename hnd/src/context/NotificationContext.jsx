import React, { createContext, useContext, useState, useCallback } from "react";
import { toast } from "react-toastify";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Number Revealed",
      message: "Number +1 (555) 123-4567 has been revealed",
      type: "info",
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      id: "2",
      title: "New Report",
      message: "A new report has been submitted for number +1 (555) 987-6543",
      type: "warning",
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: "3",
      title: "Search Credit Added",
      message: "5 search credits have been added to your account",
      type: "success",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: "4",
      title: "Contact Saved",
      message: "You have successfully saved a new contact",
      type: "info",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
  ]);

  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: `notif_${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString(),
      ...notification,
    };
    setNotifications((prev) => [newNotification, ...prev]);
    toast.info(notification.title);
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const deleteNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
};
