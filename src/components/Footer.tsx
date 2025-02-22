// src/components/Footer.tsx

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p>&copy; {new Date().getFullYear()} SmartLearn. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-400">Terms of Service</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  