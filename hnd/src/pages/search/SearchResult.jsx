import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiMapPin,
  FiGlobe,
  FiTrendingUp,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiBookmark,
  FiShare2,
  FiDownload,
  FiClock,
  FiShield,
  FiUser,
  FiFlag,
  FiEye,
} from "react-icons/fi";
import { mockSearchHistory } from "../../data/mockData";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

const SearchResult = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (location.state?.result) {
      setResult(location.state.result);
      setLoading(false);
      return;
    }

    const found = mockSearchHistory.find((s) => s.id === id);
    if (found) {
      setResult(found);
    } else {
      setResult({
        id: id || `result_${Date.now()}`,
        number: "+1 (555) 123-4567",
        status: "checked",
        location: "New York, NY",
        provider: "AT&T",
        reportCount: 3,
        riskLevel: "Medium",
        lastUpdated: new Date().toISOString(),
        country: "US",
        carrier: "AT&T Mobility",
        lineType: "Mobile",
        registeredName: "John Smith",
        additionalInfo: "This number has been reported for spam calls.",
      });
    }
    setLoading(false);
  }, [id, location]);

  const handleSaveContact = () => {
    setSaved(!saved);
    toast.success(saved ? "Contact removed" : "Contact saved successfully!");
  };

  const handleReport = () => {
    navigate("/reports/new", { state: { number: result?.number } });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(result?.number || "");
    toast.success("Number copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Result not found</p>
        <button
          onClick={() => navigate("/search")}
          className="btn-primary mt-4"
        >
          Back to Search
        </button>
      </div>
    );
  }

  const getRiskColor = (risk) => {
    const colors = {
      Low: "text-green-600 dark:text-green-400",
      Medium: "text-yellow-600 dark:text-yellow-400",
      High: "text-orange-600 dark:text-orange-400",
      Critical: "text-red-600 dark:text-red-400",
    };
    return colors[risk] || "text-gray-600";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "revealed":
        return <FiCheckCircle className="w-5 h-5 text-green-500" />;
      case "checked":
        return <FiEye className="w-5 h-5 text-blue-500" />;
      default:
        return <FiAlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/search")}
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
      >
        <FiArrowLeft /> Back to Search
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {result.number}
              </h2>
              <span
                className={`badge ${result.status === "revealed" ? "badge-success" : "badge-info"}`}
              >
                {result.status || "Checked"}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <FiMapPin className="w-4 h-4" /> {result.location || "Unknown"}
              </span>
              <span className="flex items-center gap-1">
                <FiGlobe className="w-4 h-4" /> {result.country || "US"}
              </span>
              <span className="flex items-center gap-1">
                <FiClock className="w-4 h-4" /> Updated:{" "}
                {new Date(result.lastUpdated).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleSaveContact}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                saved
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  : "btn-secondary"
              }`}
            >
              <FiBookmark className="w-4 h-4" />
              {saved ? "Saved" : "Save"}
            </button>
            <button
              onClick={handleShare}
              className="btn-secondary flex items-center gap-2"
            >
              <FiShare2 className="w-4 h-4" /> Share
            </button>
            <button
              onClick={handleReport}
              className="btn-primary flex items-center gap-2"
            >
              <FiFlag className="w-4 h-4" /> Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-dark-100">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              3
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Report Count
            </p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-dark-100">
            <p
              className={`text-2xl font-bold ${getRiskColor(result.riskLevel)}`}
            >
              {result.riskLevel || "Unknown"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Risk Level
            </p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-dark-100">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {result.provider || "Unknown"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Provider</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-dark-100">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {result.status || "Unknown"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
          </div>
        </div>

        {result.additionalInfo && (
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200 dark:border-yellow-900/20">
            <div className="flex items-start gap-3">
              <FiAlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                  Note
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  {result.additionalInfo}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
            Detailed Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">Carrier</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {result.carrier || "Unknown"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">
                Line Type
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                {result.lineType || "Unknown"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">
                Registered Name
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                {result.registeredName || "N/A"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">
                Last Verified
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                {new Date(result.lastUpdated).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchResult;
