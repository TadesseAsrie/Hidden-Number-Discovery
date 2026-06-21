export const formatDate = (date) => {
  if (!date) return "N/A";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatNumber = (number) => {
  if (!number) return "";
  return number.replace(/\s/g, "").trim();
};

export const truncateText = (text, length = 50) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};

export const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const getStatusColor = (status) => {
  const colors = {
    active: "success",
    inactive: "danger",
    pending: "warning",
    suspended: "danger",
    revealed: "success",
    checked: "info",
    verified: "success",
    rejected: "danger",
    resolved: "success",
    reviewed: "info",
  };
  return colors[status] || "gray";
};

export const getRiskColor = (risk) => {
  const colors = {
    Low: "success",
    Medium: "warning",
    High: "danger",
    Critical: "danger",
    Unknown: "gray",
  };
  return colors[risk] || "gray";
};
