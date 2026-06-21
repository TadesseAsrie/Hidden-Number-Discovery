import React from "react";
import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";

const AuthLayout = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-dark-100 dark:via-dark-200 dark:to-dark-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600 text-white text-2xl font-bold mb-4 shadow-lg shadow-primary-600/30">
            H
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Hidden Number Discovery
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Secure number intelligence platform
          </p>
        </div>

        <div className="bg-white dark:bg-dark-200 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50">
          <Outlet />
        </div>

        <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          &copy; 2026 HNDS. All rights reserved.
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
