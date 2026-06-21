import React from "react";

const About = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        About Us
      </h1>
      <div className="card prose dark:prose-invert max-w-none">
        <h3>Welcome to HNDS</h3>
        <p>
          The Hidden Number Discovery System (HNDS) is a comprehensive platform
          designed to help individuals and businesses identify and understand
          information about phone numbers. Our mission is to provide accurate,
          reliable, and actionable insights to protect users from spam, fraud,
          and unwanted calls.
        </p>

        <h3>Our Mission</h3>
        <p>
          We believe that everyone deserves to know who is calling them. Our
          platform empowers users with the information they need to make
          informed decisions about incoming calls and to report suspicious
          activity to protect the community.
        </p>

        <h3>How It Works</h3>
        <p>
          HNDS aggregates data from multiple sources including user reports,
          public databases, and network providers to build comprehensive
          profiles for phone numbers. Our advanced algorithms analyze this data
          to provide risk assessments and detailed information about each
          number.
        </p>

        <h3>Our Values</h3>
        <ul>
          <li>
            <strong>Transparency:</strong> We are open about how we collect and
            use data.
          </li>
          <li>
            <strong>Security:</strong> We prioritize the security and privacy of
            our users.
          </li>
          <li>
            <strong>Community:</strong> We believe in the power of community
            reporting.
          </li>
          <li>
            <strong>Innovation:</strong> We continuously improve our platform
            with new features.
          </li>
        </ul>

        <h3>Contact Us</h3>
        <p>
          We'd love to hear from you! Reach out to us at hello@hnds.com or
          through our support page.
        </p>

        <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
          <p className="text-primary-700 dark:text-primary-300 font-medium">
            &copy; 2026 Hidden Number Discovery System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
