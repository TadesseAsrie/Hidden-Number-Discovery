import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiSearch,
  FiUsers,
  FiClock,
  FiFlag,
  FiBell,
  FiUser,
  FiSettings,
  FiHelpCircle,
  FiMenu,
  FiX,
  FiLogOut,
  FiMoon,
  FiSun,
  FiChevronRight,
  FiChevronLeft,
  FiGrid,
} from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import { useNotifications } from "../hooks/useNotifications";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navItems = [
    { path: "/dashboard", icon: FiHome, label: "Dashboard" },
    { path: "/search", icon: FiSearch, label: "Search Number" },
    { path: "/contacts", icon: FiUsers, label: "Saved Contacts" },
    { path: "/history", icon: FiClock, label: "Search History" },
    { path: "/reports", icon: FiFlag, label: "Reports" },
    {
      path: "/notifications",
      icon: FiBell,
      label: "Notifications",
      badge: unreadCount,
    },
    { path: "/profile", icon: FiUser, label: "Profile" },
    { path: "/settings", icon: FiSettings, label: "Settings" },
    { path: "/help/faq", icon: FiHelpCircle, label: "Help Center" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-lg">
            H
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              HNDS
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Discovery System
            </p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""} ${!sidebarOpen ? "justify-center px-3" : ""}`
            }
          >
            <item.icon className={`w-5 h-5 ${!sidebarOpen ? "mx-auto" : ""}`} />
            {sidebarOpen && <span className="flex-1">{item.label}</span>}
            {sidebarOpen && item.badge > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {item.badge}
              </span>
            )}
            {!sidebarOpen && item.badge > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-2">
        <button
          onClick={toggleTheme}
          className={`sidebar-link w-full ${!sidebarOpen ? "justify-center px-3" : ""}`}
        >
          {theme === "dark" ? (
            <FiSun className="w-5 h-5" />
          ) : (
            <FiMoon className="w-5 h-5" />
          )}
          {sidebarOpen && (
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          )}
        </button>
        <button
          onClick={handleLogout}
          className={`sidebar-link w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 ${!sidebarOpen ? "justify-center px-3" : ""}`}
        >
          <FiLogOut className="w-5 h-5" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-dark-100">
      <div
        className={`hidden lg:flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-200 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <SidebarContent />
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-50"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-72 h-full bg-white dark:bg-dark-200"
              onClick={(e) => e.stopPropagation()}
            >
              <SidebarContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="glass sticky top-0 z-40 px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setMobileOpen(true);
                  } else {
                    setSidebarOpen(!sidebarOpen);
                  }
                }}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors"
              >
                <FiMenu className="w-5 h-5" />
              </button>
              <div className="lg:hidden">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                  HNDS
                </h1>
              </div>
              <div className="hidden lg:block">
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {location.pathname
                    .split("/")
                    .filter(Boolean)
                    .join(" / ")
                    .toUpperCase() || "Dashboard"}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors">
                <FiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
              <button
                onClick={() => navigate("/notifications")}
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors"
              >
                <FiBell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium text-sm">
                  {user?.fullName?.[0] || "U"}
                </div>
                <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user?.fullName || "User"}
                </span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
