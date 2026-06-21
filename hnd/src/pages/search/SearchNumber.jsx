import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiClock,
  FiMapPin,
  FiGlobe,
  FiTrendingUp,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiChevronDown,
  FiFilter,
  FiRefreshCw,
  FiBookmark,
  FiEye,
  FiShield,
} from "react-icons/fi";
import { mockSearchHistory } from "../../data/mockData";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const SearchNumber = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [filters, setFilters] = useState({
    country: "All",
    provider: "All",
    risk: "All",
  });
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    setRecentSearches(mockSearchHistory.slice(0, 5));
    setSearchHistory(mockSearchHistory);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.warning("Please enter a number to search");
      return;
    }

    setIsSearching(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const existing = mockSearchHistory.find((s) => s.number === searchQuery);
      if (existing) {
        navigate(`/search/result/${existing.id}`);
      } else {
        const mockResult = {
          id: `result_${Date.now()}`,
          number: searchQuery,
          status: "checked",
          location: "Unknown",
          provider: "Unknown",
          reportCount: 0,
          riskLevel: "Low",
          lastUpdated: new Date().toISOString(),
          country: "US",
        };
        navigate(`/search/result/${mockResult.id}`, {
          state: { result: mockResult },
        });
      }
      toast.success(`Search completed for ${searchQuery}`);
    } catch (error) {
      toast.error("Search failed. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (value) => {
    setSearchQuery(value);
    if (value.length > 2) {
      const mockSuggestions = [
        { number: "+1 (555) 123-4567", country: "US" },
        { number: "+1 (555) 987-6543", country: "US" },
        { number: "+44 20 7946 0958", country: "UK" },
        { number: "+61 2 9876 5432", country: "AU" },
        { number: "+49 30 1234567", country: "DE" },
      ].filter(
        (s) =>
          s.number.includes(value) ||
          s.number.includes(value.replace(/\s/g, "")),
      );
      setSuggestions(mockSuggestions.slice(0, 4));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.number);
    setShowSuggestions(false);
    handleSearch(new Event("submit"));
  };

  const handleRecentSearchClick = (item) => {
    setSearchQuery(item.number);
    navigate(`/search/result/${item.id}`);
  };

  const countries = [
    { code: "+1", name: "United States" },
    { code: "+44", name: "United Kingdom" },
    { code: "+61", name: "Australia" },
    { code: "+49", name: "Germany" },
    { code: "+33", name: "France" },
    { code: "+81", name: "Japan" },
    { code: "+86", name: "China" },
    { code: "+91", name: "India" },
  ];

  const getRiskBadge = (risk) => {
    const styles = {
      Low: "badge-success",
      Medium: "badge-warning",
      High: "badge-danger",
      Critical: "badge-danger",
    };
    return styles[risk] || "badge-gray";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Search Number
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Discover hidden information about any phone number
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <FiShield className="w-4 h-4" />
          <span>Credits: {user?.searchCredits || 25}</span>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-40">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="input-field"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 relative" ref={searchRef}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={() =>
                  searchQuery.length > 2 && setShowSuggestions(true)
                }
                placeholder="Enter phone number (e.g., +1 555 123 4567)"
                className="input-field pl-4 pr-12"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary py-1.5 px-4 text-sm"
              >
                {isSearching ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                ) : (
                  <FiSearch className="w-4 h-4" />
                )}
              </button>

              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-dark-200 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestionClick(s)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-dark-100 transition-colors flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-900 dark:text-white">
                          {s.number}
                        </span>
                        <span className="text-xs text-gray-500">
                          {s.country}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <FiFilter className="w-4 h-4" />
              Filters
              <FiChevronDown
                className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>Recent: {recentSearches.length} searches</span>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Country
                    </label>
                    <select
                      value={filters.country}
                      onChange={(e) =>
                        setFilters({ ...filters, country: e.target.value })
                      }
                      className="input-field text-sm"
                    >
                      <option>All</option>
                      <option>US</option>
                      <option>UK</option>
                      <option>AU</option>
                      <option>DE</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Provider
                    </label>
                    <select
                      value={filters.provider}
                      onChange={(e) =>
                        setFilters({ ...filters, provider: e.target.value })
                      }
                      className="input-field text-sm"
                    >
                      <option>All</option>
                      <option>AT&T</option>
                      <option>Verizon</option>
                      <option>T-Mobile</option>
                      <option>Unknown</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Risk Level
                    </label>
                    <select
                      value={filters.risk}
                      onChange={(e) =>
                        setFilters({ ...filters, risk: e.target.value })
                      }
                      className="input-field text-sm"
                    >
                      <option>All</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Date
                    </label>
                    <input type="date" className="input-field text-sm" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
          <FiClock className="w-4 h-4" />
          Recent Searches
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {recentSearches.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleRecentSearchClick(item)}
              className="card card-hover cursor-pointer p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600">
                    <FiSearch className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.number}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.location || "Unknown"} •{" "}
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={`badge ${getRiskBadge(item.riskLevel)}`}>
                  {item.riskLevel || "Unknown"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchNumber;
