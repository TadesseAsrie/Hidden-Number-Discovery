import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiBell,
  FiCheckCircle,
  FiX,
  FiTrash2,
  FiCheck,
  FiClock,
  FiInfo,
  FiAlertTriangle,
  FiCheckSquare,
} from "react-icons/fi";
import { useNotifications } from "../../hooks/useNotifications";

const Notifications = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useNotifications();

  const [filter, setFilter] = useState("all");

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    return true;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case "success":
        return <FiCheckCircle className="text-green-500" />;
      case "warning":
        return <FiAlertTriangle className="text-yellow-500" />;
      case "info":
        return <FiInfo className="text-blue-500" />;
      default:
        return <FiBell className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="btn-secondary flex items-center gap-2"
            >
              <FiCheckSquare className="w-4 h-4" /> Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="btn-secondary text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
            >
              <FiTrash2 className="w-4 h-4" /> Clear all
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            filter === "all"
              ? "bg-primary-600 text-white"
              : "bg-gray-100 dark:bg-dark-300 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-400"
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            filter === "unread"
              ? "bg-primary-600 text-white"
              : "bg-gray-100 dark:bg-dark-300 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-400"
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      <div className="space-y-3">
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-dark-300 rounded-full flex items-center justify-center mb-4">
              <FiBell className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">No notifications</p>
          </div>
        )}

        {filteredNotifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`card p-4 transition-all ${
              !notification.read
                ? "border-l-4 border-l-primary-500 dark:border-l-primary-400"
                : ""
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5">{getTypeIcon(notification.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {notification.title}
                      {!notification.read && (
                        <span className="ml-2 w-2 h-2 bg-primary-500 rounded-full inline-block"></span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {notification.message}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 text-gray-400 hover:text-primary-600"
                        title="Mark as read"
                      >
                        <FiCheck className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 text-gray-400 hover:text-red-600"
                      title="Delete"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                  <FiClock className="w-3 h-3" />
                  <span>
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
