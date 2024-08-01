import React from 'react';
import logo from '../images/MoringaLogo.png'

const Footer = () => {
  return (
    <footer className="bg-gray-200 border-t-2 border-slate-700 text-white py-4 mt-auto">
      <div className="container mx-auto flex flex-wrap border-black justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-black hover:text-white mr-2">
            <img src={logo} className="h-16 ml-2" alt="Logo" />
          </a>
          <span className="text-black">© 2024 Moringa School Project Management, Inc</span>
        </div>

        <ul className="flex space-x-4 mr-4">
          <li><a className="text-black hover:text-white" href="#">Facebook</a></li>
          <li><a className="text-black hover:text-white" href="#">Twitter</a></li>
          <li><a className="text-black hover:text-white" href="#">Instagram</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
