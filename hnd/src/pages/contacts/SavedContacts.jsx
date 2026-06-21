import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiDownload,
  FiMoreVertical,
  FiUser,
  FiPhone,
  FiMapPin,
  FiTag,
  FiClock,
  FiChevronRight,
} from "react-icons/fi";
import { mockContacts } from "../../data/mockData";
import { toast } from "react-toastify";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";

const SavedContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    country: "US",
    notes: "",
    tags: "",
  });

  useEffect(() => {
    setContacts(mockContacts);
    setFilteredContacts(mockContacts);
  }, []);

  useEffect(() => {
    const filtered = contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery),
    );
    setFilteredContacts(filtered);
  }, [searchQuery, contacts]);

  const handleAddContact = () => {
    setEditingContact(null);
    setFormData({ name: "", phone: "", country: "US", notes: "", tags: "" });
    setIsModalOpen(true);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      phone: contact.phone,
      country: contact.country || "US",
      notes: contact.notes || "",
      tags: contact.tags?.join(", ") || "",
    });
    setIsModalOpen(true);
  };

  const handleDeleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      toast.success("Contact deleted successfully");
    }
  };

  const handleSaveContact = () => {
    if (!formData.name || !formData.phone) {
      toast.warning("Name and phone are required");
      return;
    }

    const tags = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const newContact = {
      id: editingContact?.id || `contact_${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      country: formData.country,
      notes: formData.notes,
      tags,
      lastSearch: new Date().toISOString(),
      date: new Date().toISOString(),
    };

    if (editingContact) {
      setContacts((prev) =>
        prev.map((c) => (c.id === editingContact.id ? newContact : c)),
      );
      toast.success("Contact updated successfully");
    } else {
      setContacts((prev) => [newContact, ...prev]);
      toast.success("Contact added successfully");
    }
    setIsModalOpen(false);
  };

  const handleExport = () => {
    toast.info("Exporting contacts...");
    setTimeout(() => {
      toast.success("Contacts exported successfully");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Saved Contacts
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your saved contacts and their details
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="btn-secondary flex items-center gap-2"
          >
            <FiDownload className="w-4 h-4" /> Export
          </button>
          <button
            onClick={handleAddContact}
            className="btn-primary flex items-center gap-2"
          >
            <FiPlus className="w-4 h-4" /> Add Contact
          </button>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <Select
            options={[
              { value: "all", label: "All Contacts" },
              { value: "recent", label: "Recently Added" },
              { value: "alphabetical", label: "A-Z" },
            ]}
            className="w-full md:w-48"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card card-hover"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-lg">
                  {contact.name[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {contact.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {contact.phone}
                  </p>
                </div>
              </div>
              <div className="relative group">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300">
                  <FiMoreVertical className="w-4 h-4 text-gray-400" />
                </button>
                <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-dark-200 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hidden group-hover:block z-10">
                  <button
                    onClick={() => handleEditContact(contact)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-dark-100 flex items-center gap-2"
                  >
                    <FiEdit2 className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                  >
                    <FiTrash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-1 text-sm">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <FiMapPin className="w-4 h-4" />
                <span>{contact.country || "US"}</span>
              </div>
              {contact.tags?.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <FiTag className="w-4 h-4 text-gray-400" />
                  {contact.tags.map((tag, i) => (
                    <span key={i} className="badge badge-info">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <FiClock className="w-3 h-3" />
                <span>
                  Last search:{" "}
                  {new Date(
                    contact.lastSearch || contact.date,
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>

            {contact.notes && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {contact.notes}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No contacts found</p>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingContact ? "Edit Contact" : "Add New Contact"}
      >
        <div className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            required
          />
          <Input
            label="Phone Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="+1 (555) 000-0000"
            required
          />
          <Select
            label="Country"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            options={[
              { value: "US", label: "United States" },
              { value: "UK", label: "United Kingdom" },
              { value: "AU", label: "Australia" },
              { value: "DE", label: "Germany" },
            ]}
          />
          <Input
            label="Tags (comma separated)"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="family, work, friend"
          />
          <Input
            label="Notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            placeholder="Additional notes..."
            multiline
            rows={3}
          />
          <div className="flex items-center gap-3 pt-2">
            <Button
              onClick={handleSaveContact}
              variant="primary"
              className="flex-1"
            >
              {editingContact ? "Update Contact" : "Save Contact"}
            </Button>
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="secondary"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SavedContacts;
