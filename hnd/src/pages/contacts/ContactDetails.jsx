import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiUser,
  FiPhone,
  FiMapPin,
  FiTag,
  FiClock,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { mockContacts } from "../../data/mockData";
import { toast } from "react-toastify";

const ContactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = mockContacts.find((c) => c.id === id);
    if (found) {
      setContact(found);
    }
    setLoading(false);
  }, [id]);

  const handleEdit = () => {
    toast.info("Edit functionality would open here");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      toast.success("Contact deleted");
      navigate("/contacts");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Contact not found</p>
        <button
          onClick={() => navigate("/contacts")}
          className="btn-primary mt-4"
        >
          Back to Contacts
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/contacts")}
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
      >
        <FiArrowLeft /> Back to Contacts
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 text-3xl font-bold">
              {contact.name[0]}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {contact.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {contact.phone}
              </p>
              <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <FiMapPin className="w-4 h-4" /> {contact.country || "US"}
                </span>
                <span className="flex items-center gap-1">
                  <FiClock className="w-4 h-4" /> Added:{" "}
                  {new Date(contact.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="btn-secondary flex items-center gap-2"
            >
              <FiEdit2 className="w-4 h-4" /> Edit
            </button>
            <button
              onClick={handleDelete}
              className="btn-secondary text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
            >
              <FiTrash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Details
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400">Name</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {contact.name}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400">Phone</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {contact.phone}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400">
                  Country
                </span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {contact.country || "US"}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Additional
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400">Tags</span>
                <div className="flex gap-1 flex-wrap">
                  {contact.tags?.length > 0 ? (
                    contact.tags.map((tag, i) => (
                      <span key={i} className="badge badge-info">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">No tags</span>
                  )}
                </div>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400">
                  Last Search
                </span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {contact.lastSearch
                    ? new Date(contact.lastSearch).toLocaleDateString()
                    : "Never"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {contact.notes && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-dark-100 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Notes
            </h4>
            <p className="text-gray-700 dark:text-gray-300">{contact.notes}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ContactDetails;
