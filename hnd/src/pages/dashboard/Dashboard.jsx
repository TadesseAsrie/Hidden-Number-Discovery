import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiTrendingUp,
  FiUsers,
  FiEye,
  FiBookmark,
  FiCreditCard,
  FiBarChart2,
  FiActivity,
  FiClock,
  FiChevronRight,
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
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useAuth } from "../../hooks/useAuth";
import { mockSearchHistory, mockContacts } from "../../data/mockData";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalSearches: 0,
    hiddenNumbersChecked: 0,
    revealedNumbers: 0,
    savedContacts: 0,
    searchCredits: 25,
  });
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const searches = mockSearchHistory;
    const contacts = mockContacts;

    setStats({
      totalSearches: searches.length,
      hiddenNumbersChecked: searches.filter((s) => s.status === "checked")
        .length,
      revealedNumbers: searches.filter((s) => s.status === "revealed").length,
      savedContacts: contacts.length,
      searchCredits: 25,
    });

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    setDailyData(
      days.map((day, i) => ({
        name: day,
        searches: Math.floor(Math.random() * 20) + 5,
        reveals: Math.floor(Math.random() * 10) + 2,
      })),
    );

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    setMonthlyData(
      months.map((month, i) => ({
        name: month,
        searches: Math.floor(Math.random() * 50) + 10,
        reveals: Math.floor(Math.random() * 25) + 5,
      })),
    );

    setActivityData([
      { name: "Searches", value: searches.length },
      {
        name: "Reveals",
        value: searches.filter((s) => s.status === "revealed").length,
      },
      { name: "Reports", value: Math.floor(Math.random() * 10) + 2 },
    ]);

    const recent = [
      ...searches.slice(0, 3).map((s) => ({ ...s, type: "search" })),
      ...contacts.slice(0, 2).map((c) => ({ ...c, type: "contact" })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));
    setRecentActivity(recent.slice(0, 5));
  }, []);

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

  const statCards = [
    {
      title: "Total Searches",
      value: stats.totalSearches,
      icon: FiSearch,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      change: "+12%",
    },
    {
      title: "Hidden Numbers Checked",
      value: stats.hiddenNumbersChecked,
      icon: FiEye,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      change: "+8%",
    },
    {
      title: "Revealed Numbers",
      value: stats.revealedNumbers,
      icon: FiTrendingUp,
      color: "bg-green-500/10 text-green-600 dark:text-green-400",
      change: "+5%",
    },
    {
      title: "Saved Contacts",
      value: stats.savedContacts,
      icon: FiBookmark,
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
      change: "+3%",
    },
    {
      title: "Search Credits",
      value: stats.searchCredits,
      icon: FiCreditCard,
      color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
      change: "Available",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.fullName || "User"} 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Here's what's happening with your number discovery activities
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-primary flex items-center gap-2">
            <FiSearch /> New Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card card-hover"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {card.change}
              </span>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Daily Searches
            </h3>
            <select className="text-sm border border-gray-200 dark:border-dark-400 rounded-lg px-3 py-1 bg-white dark:bg-dark-200">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  className="dark:stroke-gray-700"
                />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    borderColor: "#e5e7eb",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#1f2937" }}
                />
                <Area
                  type="monotone"
                  dataKey="searches"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="reveals"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.2}
                />
                <Legend />
              </AreaChart>
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
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h3>
          <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
            View all <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {recentActivity.length > 0 ? (
            recentActivity.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-100 transition-colors"
              >
                <div
                  className={`p-2 rounded-lg ${
                    item.type === "search"
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      : "bg-green-500/10 text-green-600 dark:text-green-400"
                  }`}
                >
                  {item.type === "search" ? (
                    <FiSearch className="w-4 h-4" />
                  ) : (
                    <FiBookmark className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.type === "search"
                      ? `Searched: ${item.number}`
                      : `Saved: ${item.name}`}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.type === "search" ? item.status : "Contact saved"} •{" "}
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`badge ${
                    item.status === "revealed"
                      ? "badge-success"
                      : item.status === "checked"
                        ? "badge-info"
                        : "badge-gray"
                  }`}
                >
                  {item.status || "saved"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No recent activity
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
