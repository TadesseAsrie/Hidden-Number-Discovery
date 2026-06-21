import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiFlag,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiMoreVertical,
  FiTrash2,
  FiEdit2,
} from "react-icons/fi";
import { mockReports } from "../../data/mockData";
import { toast } from "react-toastify";

const ReportsList = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 8;

  useEffect(() => {
    setReports(mockReports);
    setFilteredReports(mockReports);
  }, []);

  useEffect(() => {
    let filtered = reports;
    if (searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.number.includes(searchQuery) ||
          r.type.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }
    setFilteredReports(filtered);
    setCurrentPage(1);
  }, [searchQuery, statusFilter, reports]);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedData = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getStatusBadge = (status) => {
    const styles = {
      pending: "badge-warning",
      reviewed: "badge-info",
      resolved: "badge-success",
      rejected: "badge-danger",
    };
    return styles[status] || "badge-gray";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reports
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your submitted reports
          </p>
        </div>
        <button
          onClick={() => navigate("/reports/new")}
          className="btn-primary flex items-center gap-2"
        >
          <FiFlag className="w-4 h-4" /> New Report
        </button>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field w-full md:w-40"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {paginatedData.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card card-hover"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-start gap-4">
                <div
                  className={`p-2 rounded-lg ${
                    report.status === "resolved"
                      ? "bg-green-500/10 text-green-600"
                      : report.status === "pending"
                        ? "bg-yellow-500/10 text-yellow-600"
                        : "bg-blue-500/10 text-blue-600"
                  }`}
                >
                  <FiFlag className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {report.number}
                    </span>
                    <span className={`badge ${getStatusBadge(report.status)}`}>
                      {report.status}
                    </span>
                    <span className="badge badge-info">{report.type}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {report.description}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    <span>ID: {report.id}</span>
                    <span>•</span>
                    <span>{new Date(report.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-secondary text-sm flex items-center gap-1">
                  <FiEye className="w-4 h-4" /> View
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {paginatedData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No reports found</p>
          <button
            onClick={() => navigate("/reports/new")}
            className="btn-primary mt-4"
          >
            Submit a Report
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Showing{" "}
            {Math.min(
              filteredReports.length,
              (currentPage - 1) * itemsPerPage + 1,
            )}{" "}
            - {Math.min(currentPage * itemsPerPage, filteredReports.length)} of{" "}
            {filteredReports.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 disabled:opacity-50"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 disabled:opacity-50"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsList;
