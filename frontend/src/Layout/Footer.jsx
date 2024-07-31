import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-gray-400 hover:text-white mr-2">
            <svg className="bi" width="30" height="24" viewBox="0 0 24 24">
              {/* SVG content */}
            </svg>
          </a>
          <span className="text-gray-400">© 2024 Moringa School Project Management, Inc</span>
        </div>

        <ul className="flex space-x-4">
          <li><a className="text-gray-400 hover:text-white" href="#">Facebook</a></li>
          <li><a className="text-gray-400 hover:text-white" href="#">Twitter</a></li>
          <li><a className="text-gray-400 hover:text-white" href="#">Instagram</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
