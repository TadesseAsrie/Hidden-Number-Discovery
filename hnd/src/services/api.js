import {
  mockSearchHistory,
  mockContacts,
  mockReports,
  mockUsers,
} from "../data/mockData";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  login: async (email, password) => {
    await delay(800);
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) throw new Error("Invalid credentials");
    const { password: _, ...userData } = user;
    return userData;
  },

  register: async (userData) => {
    await delay(800);
    const newUser = {
      id: `user_${Date.now()}`,
      ...userData,
      role: "user",
      status: "active",
      createdAt: new Date().toISOString(),
    };
    return newUser;
  },

  searchNumber: async (number) => {
    await delay(1000);
    const existing = mockSearchHistory.find((s) => s.number === number);
    if (existing) return existing;
    return {
      id: `result_${Date.now()}`,
      number,
      status: "checked",
      location: "Unknown",
      provider: "Unknown",
      reportCount: 0,
      riskLevel: "Low",
      lastUpdated: new Date().toISOString(),
    };
  },

  getSearchHistory: async () => {
    await delay(500);
    return mockSearchHistory;
  },

  getContacts: async () => {
    await delay(500);
    return mockContacts;
  },

  saveContact: async (contact) => {
    await delay(600);
    return { ...contact, id: `contact_${Date.now()}` };
  },

  deleteContact: async (id) => {
    await delay(400);
    return { success: true };
  },

  getReports: async () => {
    await delay(500);
    return mockReports;
  },

  submitReport: async (report) => {
    await delay(1000);
    return {
      ...report,
      id: `report_${Date.now()}`,
      status: "pending",
      date: new Date().toISOString(),
    };
  },

  getUsers: async () => {
    await delay(500);
    return mockUsers;
  },

  updateUserStatus: async (id, status) => {
    await delay(400);
    return { success: true };
  },

  getStats: async () => {
    await delay(400);
    return {
      totalSearches: mockSearchHistory.length,
      hiddenNumbersChecked: mockSearchHistory.filter(
        (s) => s.status === "checked",
      ).length,
      revealedNumbers: mockSearchHistory.filter((s) => s.status === "revealed")
        .length,
      savedContacts: mockContacts.length,
      searchCredits: 25,
      totalUsers: mockUsers.length,
      totalReports: mockReports.length,
      activeUsers: Math.floor(mockUsers.length * 0.7),
    };
  },
};
