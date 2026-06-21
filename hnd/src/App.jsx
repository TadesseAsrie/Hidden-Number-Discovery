import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Dashboard
import Dashboard from "./pages/dashboard/Dashboard";

// Number Search
import SearchNumber from "./pages/search/SearchNumber";
import SearchResult from "./pages/search/SearchResult";

// Contacts
import SavedContacts from "./pages/contacts/SavedContacts";
import ContactDetails from "./pages/contacts/ContactDetails";

// History
import SearchHistory from "./pages/history/SearchHistory";

// Reports
import ReportNumber from "./pages/reports/ReportNumber";
import ReportsList from "./pages/reports/ReportsList";

// Notifications
import Notifications from "./pages/notifications/Notifications";

// Profile
import Profile from "./pages/profile/Profile";

// Settings
import Settings from "./pages/settings/Settings";

// Help Center
import FAQ from "./pages/help/FAQ";
import ContactSupport from "./pages/help/ContactSupport";
import Terms from "./pages/help/Terms";
import Privacy from "./pages/help/Privacy";
import About from "./pages/help/About";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import ReportManagement from "./pages/admin/ReportManagement";
import Analytics from "./pages/admin/Analytics";

// Hooks
import { useAuth } from "./hooks/useAuth";
import { useTheme } from "./hooks/useTheme";

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "dark" ? "dark" : "light"}
      />

      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Main App Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<SearchNumber />} />
          <Route path="/search/result/:id" element={<SearchResult />} />
          <Route path="/contacts" element={<SavedContacts />} />
          <Route path="/contacts/:id" element={<ContactDetails />} />
          <Route path="/history" element={<SearchHistory />} />
          <Route path="/reports" element={<ReportsList />} />
          <Route path="/reports/new" element={<ReportNumber />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help/faq" element={<FAQ />} />
          <Route path="/help/support" element={<ContactSupport />} />
          <Route path="/help/terms" element={<Terms />} />
          <Route path="/help/privacy" element={<Privacy />} />
          <Route path="/help/about" element={<About />} />
        </Route>

        {/* Admin Routes */}
        <Route
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/reports" element={<ReportManagement />} />
          <Route path="/admin/analytics" element={<Analytics />} />
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

export default App;
