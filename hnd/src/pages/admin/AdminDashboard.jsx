import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiSearch,
  FiFlag,
  FiActivity,
  FiTrendingUp,
  FiUserPlus,
  FiUserX,
  FiEye,
  FiClock,
  FiChevronRight,
  FiBarChart2,
  FiPieChart,
  FiCalendar,
} from "react-icons/fi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { mockUsers, mockSearchHistory, mockReports } from "../../data/mockData";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSearches: 0,
    totalReports: 0,
    activeUsers: 0,
  });

  const [dailyStats, setDailyStats] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    setStats({
      totalUsers: mockUsers.length,
      totalSearches: mockSearchHistory.length,
      totalReports: mockReports.length,
      activeUsers: Math.floor(mockUsers.length * 0.7),
    });

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    setDailyStats(
      days.map((day) => ({
        name: day,
        searches: Math.floor(Math.random() * 30) + 5,
        users: Math.floor(Math.random() * 10) + 2,
      })),
    );

    const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
    setUserGrowth(
      months.map((month) => ({
        name: month,
        users: Math.floor(Math.random() * 50) + 20,
      })),
    );

    setActivityData([
      { name: "Searches", value: mockSearchHistory.length },
      { name: "Reports", value: mockReports.length },
      { name: "Users", value: mockUsers.length },
    ]);
  }, []);

  const COLORS = ["#3b82f6", "#f59e0b", "#10b981"];

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: FiUsers,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Total Searches",
      value: stats.totalSearches,
      icon: FiSearch,
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      title: "Total Reports",
      value: stats.totalReports,
      icon: FiFlag,
      color: "bg-red-500/10 text-red-600",
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: FiActivity,
      color: "bg-green-500/10 text-green-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Overview of platform activity and metrics
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card card-hover"
          >
            <div className={`p-2 rounded-lg inline-block ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {card.value}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {card.title}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Daily Activity
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyStats}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  className="dark:stroke-gray-700"
                />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="searches" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="users" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            User Growth
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowth}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  className="dark:stroke-gray-700"
                />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="card lg:col-span-1">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Activity Breakdown
          </h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={activityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {activityData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card lg:col-span-2">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-left hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              <FiUsers className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
              <p className="font-medium text-gray-900 dark:text-white">
                Manage Users
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                View and manage user accounts
              </p>
            </button>
            <button className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-left hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
              <FiFlag className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
              <p className="font-medium text-gray-900 dark:text-white">
                Review Reports
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Pending reports to review
              </p>
            </button>
            <button className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-left hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              <FiTrendingUp className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" />
              <p className="font-medium text-gray-900 dark:text-white">
                View Analytics
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Detailed platform analytics
              </p>
            </button>
            <button className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-left hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
              <FiCalendar className="w-6 h-6 text-orange-600 dark:text-orange-400 mb-2" />
              <p className="font-medium text-gray-900 dark:text-white">
                Activity Log
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Recent platform activity
              </p>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
