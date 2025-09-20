import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBicycle, FaBars, FaTimes, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import Button from "./Button";

function NavbarLinks({ isOpen, isLoggedIn }) {
  // Links for guest users (before login)
  const guestLinks = [
    { name: "About us", to: "/about" },
    { name: "Scooters", to: "/scooters" },
    { name: "Locations", to: "/location" },
    { name: "Blog", to: "/blog" },
  ];

  // Links for logged-in users
  const userLinks = [
    { name: "My Ride", to: "/my-ride" },
    { name: "Payments", to: "/payments" },
    { name: "Profile", to: "/profile" },
  ];

  return (
    <>
      {(isLoggedIn ? userLinks : guestLinks).map((link, index) => (
        <li key={index}
          className={`hover:text-[var(--secondary-color-light)] ${
            isOpen ? "last:mb-5" : ""
          } transition-all cursor-pointer`}
        >
          <NavLink to={link.to}
            className={({ isActive }) =>
              `hover:text-[var(--secondary-color-light)] transition-all ${
                isActive
                  ? "border-b-3 border-blue-700"
                  : "border-b-3 border-transparent"
              }`
            }
          >
            {link.name}
          </NavLink>
        </li>
      ))}
    </>
  );
}

function ProfileDropdown({ isOpen, onClose, handleLogout, navigate }) {
  const handleSettingsClick = () => {
    navigate("/profile");
    onClose();
  };

  const handleLogoutClick = () => {
    handleLogout();
    onClose();
  };

  return (
    <div className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 ${
      isOpen ? "opacity-100 visible" : "opacity-0 invisible"
    }`}>
      <div className="py-2">
        <button
          onClick={handleSettingsClick}
          className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
        >
          <FaCog className="text-gray-500" />
          Settings
        </button>
        <button
          onClick={handleLogoutClick}
          className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
        >
          <FaSignOutAlt className="text-red-500" />
          Logout
        </button>
      </div>
    </div>
  );
}

// /* ==================================== Navbar Start ==================================== */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      const heroHeight = hero ? hero.offsetHeight : 0;
      setScrolled(window.scrollY > heroHeight - 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile-dropdown-container')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-black/80 text-white" : "bg-black/30 text-white"
      }`}
    >
      <div className="w-[90%] mx-auto p-[2rem]">
        <div className="flex items-center justify-between">
          <NavLink className="flex gap-3 text-4xl cursor-pointer" to={ isLoggedIn ? "/dashboard" : "/" }>
            <FaBicycle /> Guzo
          </NavLink>

          {/* Mobile Toggle */}
          <div className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FaTimes className="text-3xl" />
            ) : (
              <FaBars className="text-3xl" />
            )}
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-[2rem] text-xl xl:gap-[3rem] xl:text-2xl">
            <NavbarLinks
              isOpen={isOpen}
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
            />
            {!isLoggedIn ? (
              <NavLink to="/signup">
                <Button
                  name="Sign up"
                  type="primary"
                  textSize="text-2xl"
                  link="/signup"
                />
              </NavLink>
            ) : (
              <li className="relative profile-dropdown-container">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <FaUser className="text-2xl" />
                </button>
                <ProfileDropdown
                  isOpen={isProfileOpen}
                  onClose={() => setIsProfileOpen(false)}
                  handleLogout={handleLogout}
                  navigate={navigate}
                />
              </li>
            )}
          </ul>

          {/* Mobile Menu */}
          <ul
            className={`absolute lg:hidden top-24 left-0 w-full bg-white text-black text-xl flex flex-col items-center gap-6 transition-all duration-300 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            <NavbarLinks
              isOpen={isOpen}
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
            />
            {!isLoggedIn ? (
              <NavLink to="/signup">
                <Button
                  name="Sign up"
                  type="primary"
                  textSize="text-2xl"
                  link="/signup"
                />
              </NavLink>
            ) : (
              <li className="w-full flex flex-col items-center gap-4">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition w-full max-w-xs"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
// /* ==================================== Navbar End ==================================== */