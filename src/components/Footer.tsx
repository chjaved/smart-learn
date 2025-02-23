// src/components/Footer.tsx
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        {/* Copyright */}
        <p>&copy; {new Date().getFullYear()} SmartLearn. All rights reserved.</p>
        
        {/* Links */}
        <div className="flex space-x-6">
          <a href="/privacypolicy" className="hover:text-gray-400">Privacy Policy</a>
          <a href="/ToS" className="hover:text-gray-400">Terms of Service</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-gray-400">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-gray-400">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-gray-400">
            <FaLinkedin />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-gray-400">
            <FaInstagram />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;