import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const password = watch("password");

  const onSubmit = async (data) => {
    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Password has been reset successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Reset Password
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Enter your new password below.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            New Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input-field pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input-field pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
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
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <Link
            to="/login"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
          >
            Back to Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
