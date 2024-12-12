import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t bg-gray-100">
      <div className="container mx-auto py-8 px-4 text-center lg:text-left flex flex-col lg:flex-row lg:justify-between gap-6">
        {/* Left Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-sm text-gray-600">
            We are committed to providing the best service and products to our
            customers. Stay connected with us to learn more about our journey
            and offerings.
          </p>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>
              <a href="/about" className="hover:text-primary-100">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-primary-100">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-primary-100">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-primary-100">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="text-center lg:text-right">
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex items-center justify-center lg:justify-end gap-4 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-100"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-100"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-100"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-100"
            >
              <FaTwitter />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-100"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t mt-6 py-4">
        <p className="text-sm text-gray-500 text-center">
          © 2024 All Rights Reserved. Designed with ❤️ by Your Company.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
