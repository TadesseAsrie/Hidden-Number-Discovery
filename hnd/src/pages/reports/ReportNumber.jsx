import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FiFlag,
  FiUpload,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowLeft,
  FiFile,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";

const ReportNumber = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      number: location.state?.number || "",
    },
  });
  const [evidenceFiles, setEvidenceFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success(
        "Report submitted successfully! We will review it shortly.",
      );
      navigate("/reports");
    } catch (error) {
      toast.error("Failed to submit report. Please try again.");
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    setEvidenceFiles((prev) => [...prev, ...files]);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setEvidenceFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setEvidenceFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/reports")}
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
      >
        <FiArrowLeft /> Back to Reports
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card max-w-2xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400">
            <FiFlag className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Report a Number
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Submit a report about suspicious or unwanted calls
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number *
            </label>
            <input
              {...register("number", {
                required: "Phone number is required",
                pattern: {
                  value: /^[\+\d\s\-\(\)]{7,20}$/,
                  message: "Invalid phone number format",
                },
              })}
              type="text"
              placeholder="+1 (555) 123-4567"
              className="input-field"
            />
            {errors.number && (
              <p className="text-red-500 text-sm mt-1">
                {errors.number.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Report Type *
            </label>
            <select
              {...register("reportType", {
                required: "Please select a report type",
              })}
              className="input-field"
            >
              <option value="">Select type...</option>
              <option value="spam">Spam Call</option>
              <option value="fraud">Fraud / Scam</option>
              <option value="harassment">Harassment</option>
              <option value="telemarketing">Telemarketing</option>
              <option value="other">Other</option>
            </select>
            {errors.reportType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.reportType.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description *
            </label>
            <textarea
              {...register("description", {
                required: "Please provide a description",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
              rows={4}
              placeholder="Describe your experience with this number..."
              className="input-field"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Upload Evidence
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/10"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleFileDrop}
            >
              <FiUpload className="w-10 h-10 mx-auto text-gray-400 mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Drag & drop files here, or{" "}
                <label className="text-primary-600 hover:underline cursor-pointer">
                  browse
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                  />
                </label>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supports images, PDF, DOC
              </p>
            </div>

            {evidenceFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {evidenceFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 dark:bg-dark-100 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <FiFile className="text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary py-3 text-base flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Submitting...
              </>
            ) : (
              <>
                <FiFlag className="w-5 h-5" /> Submit Report
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ReportNumber;
