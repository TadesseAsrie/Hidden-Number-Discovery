import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiGlobe,
  FiMoon,
  FiSun,
  FiClock,
  FiLock,
  FiShield,
  FiUser,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiAlertTriangle,
  FiSmartphone,
  FiMail,
  FiBell,
  FiSave,
} from "react-icons/fi";
import { useTheme } from "../../hooks/useTheme";
import { toast } from "react-toastify";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("general");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC-5");

  const tabs = [
    { id: "general", label: "General", icon: FiGlobe },
    { id: "privacy", label: "Privacy", icon: FiShield },
    { id: "security", label: "Security", icon: FiLock },
  ];

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your account preferences
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-48 flex-shrink-0">
          <div className="card p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm ${
                  activeTab === tab.id
                    ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-100"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="card"
          >
            {activeTab === "general" && (
              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  General Settings
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="input-field"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Theme
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => (theme === "light" ? toggleTheme() : null)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                        theme === "light"
                          ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <FiSun className="w-4 h-4" /> Light
                    </button>
                    <button
                      onClick={() => (theme === "dark" ? toggleTheme() : null)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                        theme === "dark"
                          ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <FiMoon className="w-4 h-4" /> Dark
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Time Zone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="input-field"
                  >
                    <option value="UTC-8">UTC-8 (Pacific Time)</option>
                    <option value="UTC-5">UTC-5 (Eastern Time)</option>
                    <option value="UTC+0">UTC (GMT)</option>
                    <option value="UTC+1">UTC+1 (Central European)</option>
                    <option value="UTC+8">UTC+8 (Singapore)</option>
                  </select>
                </div>

                <button
                  onClick={handleSave}
                  className="btn-primary flex items-center gap-2"
                >
                  <FiSave className="w-4 h-4" /> Save Settings
                </button>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Privacy Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-100 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Visibility
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Make your profile visible to others
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary-500 dark:peer-focus:ring-primary-400 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-100 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Search Privacy
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Hide your searches from others
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary-500 dark:peer-focus:ring-primary-400 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-100 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Data Preferences
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Allow data collection for analytics
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary-500 dark:peer-focus:ring-primary-400 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  className="btn-primary flex items-center gap-2"
                >
                  <FiSave className="w-4 h-4" /> Save Privacy Settings
                </button>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Security Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-100 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Two-Factor Authentication
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {twoFactorEnabled ? "Enabled" : "Disabled"} - Add an
                        extra layer of security
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setTwoFactorEnabled(!twoFactorEnabled);
                        toast.info(
                          twoFactorEnabled ? "2FA disabled" : "2FA enabled",
                        );
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        twoFactorEnabled
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          : "btn-primary"
                      }`}
                    >
                      {twoFactorEnabled ? "✓ Enabled" : "Enable"}
                    </button>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-dark-100 rounded-lg">
                    <p className="font-medium text-gray-900 dark:text-white">
                      Login Activity
                    </p>
                    <div className="mt-2 space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FiSmartphone className="text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300">
                            Chrome on Windows
                          </span>
                        </div>
                        <span className="text-gray-400">
                          New York, 2 hours ago
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FiMail className="text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300">
                            Safari on iPhone
                          </span>
                        </div>
                        <span className="text-gray-400">
                          London, 2 days ago
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200 dark:border-yellow-900/20">
                    <div className="flex items-start gap-3">
                      <FiAlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                          Security Tip
                        </p>
                        <p className="text-sm text-yellow-700 dark:text-yellow-400">
                          Enable two-factor authentication for enhanced account
                          security.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  className="btn-primary flex items-center gap-2"
                >
                  <FiSave className="w-4 h-4" /> Save Security Settings
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
