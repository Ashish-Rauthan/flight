import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/cywav_logo.webp';
 
const navItems = [
  { name: "Flights", icon: "✈️", path: "/" },
  { name: "Hotels", icon: "🏨", path: "/soon" },
  { name: "Holidays", icon: "🌴", path: "/soon" },
  { name: "Trains", icon: "🚆", path: "/soon" },
  { name: "Buses", icon: "🚌", path: "/soon" },
  { name: "Cabs", icon: "🚕", path: "/soon" },
  { name: "Attractions", icon: "🎡", path: "/soon" },
  { name: "Visa", icon: "🛂", path: "/soon" },
  { name: "Cruise", icon: "🛳️", path: "/soon" },
  { name: "Forex", icon: "💵", path: "/soon" },
  { name: "Insurance", icon: "🛡️", path: "/soon" },
];
 
// Only for mobile
const mobileOnly = [
  { name: "About", icon: "ℹ️", path: "/about" },
  { name: "Contact", icon: "📞", path: "/contact" },
];
 
const TopBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => {
      // Only apply scroll effect on desktop
      if (window.innerWidth >= 1024) {
        setScrolled(window.scrollY > 50);
      } else {
        setScrolled(false); // disable on mobile
      }
    };
 
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // run once on mount
 
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);
 
  const headerClasses = `
    fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out
    py-3 px-6 flex items-center justify-between
    ${scrolled ? 'bg-white text-gray-800 shadow-md' : 'bg-transparent text-white lg:bg-transparent lg:text-white'}
    ${!scrolled && 'bg-white text-gray-800 lg:bg-transparent lg:text-white'}
  `;
 
  return (
    <header className={headerClasses}>
      {/* Logo */}
      <div className="flex items-center space-x-4 ml-15">
        <Link to="/">
          <img src={logo} alt="Cywav-logo" className="h-12 md:h-16" />
        </Link>
      </div>
 
      {/* Desktop Nav */}
      <nav
        className={`
          hidden lg:flex items-center space-x-4 xl:space-x-2
          transition-all duration-500 ease-in-out
          ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'}
        `}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`
              flex flex-col items-center justify-center p-2 rounded-md
              hover:bg-gray-100 hover:text-blue-600
              text-gray-800
              transition duration-300
            `}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs mt-1 font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
 
      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Hamburger (always black) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-2xl text-black focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
 
      {/* Mobile Dropdown Menu */}
      <div
        className={`
          lg:hidden absolute top-full left-0 w-full bg-white shadow-md overflow-hidden
          transition-all duration-300 ease-in-out
          ${menuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="flex flex-col space-y-4 p-6">
          {mobileOnly.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center space-x-3 text-gray-800 hover:text-blue-600 transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-lg font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};
 
export default TopBar;