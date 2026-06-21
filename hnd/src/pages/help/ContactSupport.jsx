import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FiSend, FiMail, FiUser, FiMessageSquare } from "react-icons/fi";
import { toast } from "react-toastify";

const ContactSupport = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success(
        "Message sent! Our support team will respond within 24 hours.",
      );
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Contact Support
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Get help from our support team
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card lg:col-span-2"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Send a Message
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Name *
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register("name", { required: "Name is required" })}
                  className="input-field pl-10"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email *
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email",
                    },
                  })}
                  className="input-field pl-10"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject *
              </label>
              <select
                {...register("subject", { required: "Subject is required" })}
                className="input-field"
              >
                <option value="">Select subject...</option>
                <option value="account">Account Issues</option>
                <option value="billing">Billing & Payments</option>
                <option value="search">Search Problems</option>
                <option value="report">Report Issues</option>
                <option value="other">Other</option>
              </select>
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message *
              </label>
              <div className="relative">
                <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                  rows={5}
                  className="input-field pl-10"
                  placeholder="Describe your issue in detail..."
                />
              </div>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Sending...
                </>
              ) : (
                <>
                  <FiSend className="w-4 h-4" /> Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card lg:col-span-1"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Contact Information
          </h3>
          <div className="space-y-4 text-sm">
            <div className="p-3 bg-gray-50 dark:bg-dark-100 rounded-lg">
              <p className="font-medium text-gray-700 dark:text-gray-300">
                Email
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                support@hnds.com
              </p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-dark-100 rounded-lg">
              <p className="font-medium text-gray-700 dark:text-gray-300">
                Response Time
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Usually within 24 hours
              </p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-dark-100 rounded-lg">
              <p className="font-medium text-gray-700 dark:text-gray-300">
                Support Hours
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Mon-Fri, 9:00 AM - 6:00 PM EST
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSupport;
