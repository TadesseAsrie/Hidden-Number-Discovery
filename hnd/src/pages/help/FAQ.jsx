import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      q: "What is the Hidden Number Discovery System?",
      a: "HNDS is a platform that helps you identify and discover hidden information about phone numbers, including spam reports, carrier information, and risk assessment.",
    },
    {
      q: "How do I search for a number?",
      a: "Simply enter the phone number in the search bar on the Search page. You can also select the country code from the dropdown menu for international numbers.",
    },
    {
      q: "What does the risk level mean?",
      a: "Risk levels indicate the likelihood of a number being associated with spam or fraudulent activity. Low = minimal risk, Medium = moderate risk, High = significant risk, Critical = extreme risk.",
    },
    {
      q: "How can I report a number?",
      a: 'Navigate to the Reports page and click "New Report". Fill in the number, report type, description, and optionally upload evidence to submit your report.',
    },
    {
      q: "Is my search history private?",
      a: "Yes, your search history is private and only visible to you. You can also clear your history at any time from the Search History page.",
    },
    {
      q: "What are search credits?",
      a: "Search credits are used to perform searches on the platform. Each search consumes one credit. You can view your remaining credits on the dashboard.",
    },
    {
      q: "How do I save a contact?",
      a: 'When viewing a search result, click the "Save" button to add the number to your saved contacts. You can manage all saved contacts from the Contacts page.',
    },
    {
      q: "What types of reports can I submit?",
      a: "You can submit reports for spam calls, fraud/scams, harassment, telemarketing, and other types of unwanted calls.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Find answers to common questions about HNDS
        </p>
      </div>

      <div className="card">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card cursor-pointer"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {faq.q}
                </h3>
                {openIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-gray-500 dark:text-gray-400 mt-2"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </div>
              <div className="flex-shrink-0 mt-1">
                {openIndex === index ? (
                  <FiChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <FiChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No FAQs found matching your search
          </p>
        </div>
      )}
    </div>
  );
};

export default FAQ;
