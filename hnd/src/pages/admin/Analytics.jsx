import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiUsers,
  FiSearch,
  FiFlag,
  FiCalendar,
  FiBarChart2,
  FiPieChart,
  FiChevronDown,
  FiChevronUp,
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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { mockSearchHistory, mockUsers, mockReports } from "../../data/mockData";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [searchTrends, setSearchTrends] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    setSearchTrends(
      days.map((day, i) => ({
        name: day,
        searches: Math.floor(Math.random() * 40) + 10,
        reveals: Math.floor(Math.random() * 20) + 5,
      })),
    );

    const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
    setUserGrowth(
      months.map((month) => ({
        name: month,
        newUsers: Math.floor(Math.random() * 30) + 5,
        activeUsers: Math.floor(Math.random() * 50) + 20,
      })),
    );

    setActivityData([
      { name: "Searches", value: mockSearchHistory.length },
      {
        name: "Reveals",
        value: mockSearchHistory.filter((s) => s.status === "revealed").length,
      },
      { name: "Reports", value: mockReports.length },
      { name: "Users", value: mockUsers.length },
    ]);
  }, []);

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Platform analytics and insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field w-36"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
              <FiSearch className="w-5 h-5" />
            </div>
            <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
              +15%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {mockSearchHistory.length}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Searches
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="card"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10 text-green-600">
              <FiUsers className="w-5 h-5" />
            </div>
            <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
              +8%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {mockUsers.length}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Users
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600">
              <FiFlag className="w-5 h-5" />
            </div>
            <span className="text-xs text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-0.5 rounded-full">
              +3
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {mockReports.length}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Reports
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600">
              <FiTrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
              +22%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            87%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Engagement Rate
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Search Trends
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={searchTrends}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  className="dark:stroke-gray-700"
                />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="searches"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                  name="Searches"
                />
                <Area
                  type="monotone"
                  dataKey="reveals"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.2}
                  name="Reveals"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="card"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            User Growth
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowth}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  className="dark:stroke-gray-700"
                />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="newUsers"
                  fill="#3b82f6"
                  name="New Users"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="activeUsers"
                  fill="#10b981"
                  name="Active Users"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
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
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card lg:col-span-2">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Key Insights
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-100 rounded-lg">
              <span className="text-gray-600 dark:text-gray-300">
                Most Searched Number
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                +1 (555) 123-4567
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-100 rounded-lg">
              <span className="text-gray-600 dark:text-gray-300">
                Most Reported Type
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                Spam Calls
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-100 rounded-lg">
              <span className="text-gray-600 dark:text-gray-300">
                Peak Activity Time
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                2:00 PM - 4:00 PM
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-100 rounded-lg">
              <span className="text-gray-600 dark:text-gray-300">
                Top Country
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                United States
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-100 rounded-lg">
              <span className="text-gray-600 dark:text-gray-300">
                Average Searches/Day
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                18
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
