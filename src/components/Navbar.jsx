import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBicycle, FaBars, FaTimes } from "react-icons/fa";

import Button from "./Button";

function NavbarLinks({ isOpen }) {
  const links = [
    { name: "About us", to: "/about" },
    { name: "Scooters", to: "/scooters" },
    { name: "Locations", to: "/location" },
    { name: "Blog", to: "/blog" },
  ];

  return (
    <>
      {links.map((link, index) => (
        <li
          className={`hover:text-[var(--secondary-color-light)] ${
            isOpen ? "last:mb-5" : ""
          } transition-all cursor-pointer`}
          key={index}
        >
          <NavLink to={link.to}>{link.name}</NavLink>
        </li>
      ))}
    </>
  );
}

/* ==================================== Navbar Start ==================================== */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login state from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/"); // redirect to login page
  };

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      const heroHeight = hero ? hero.offsetHeight : 0;

      if (window.scrollY > heroHeight - 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-black/80 text-white" : "bg-black/30 text-white"
      }`}
    >
      <div className="w-[90%] mx-auto p-[2rem]">
        <div className="flex items-center justify-between">
          <NavLink className="flex gap-3 text-4xl cursor-pointer" to="/">
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
            <NavbarLinks />

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <NavLink
  to="/signup"
  className="inline-block rounded-lg bg-blue-800 px-6 py-2 text-white font-medium shadow-md transition hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
>
  Sign Up
</NavLink>

            )}
          </ul>

          {/* Mobile Menu */}
          <ul
            className={`absolute lg:hidden top-24 left-0 w-full bg-white text-black text-xl flex flex-col items-center gap-6 transition-all duration-300 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            <NavbarLinks isOpen={isOpen} />
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/signup">
                <Button name="Sign up" type="primary" textSize="text-xl" />
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
/* ==================================== Navbar End ==================================== */
