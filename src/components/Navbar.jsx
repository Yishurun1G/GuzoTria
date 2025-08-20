import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBicycle, FaBars, FaTimes } from "react-icons/fa";
// import Logo from "../assets/images/Logo.svg";

function NavbarLinks({isOpen}){
  const links = [
    {name: "About us", to: "/about"},
    {name: "Scooters", to: "/scooters"},
    {name: "Locations", to: "/locations"},
    {name: "Blog", to: "/blog"},
  ]

  return(
    <>
      { 
        links.map((link, index) => (
          <li className={`hover:text-[var(--secondary-color-light)] ${isOpen ? "last:mb-5" : ""} transition-all cursor-pointer`} key={index}>
            <NavLink to={link.to}>{link.name}</NavLink>
          </li>
        ))
      }
    </>
  )
}

/* ==================================== Navbar Start ==================================== */
export default function Navbar(){
  const [isOpen, setIsOpen] = useState(false);

  return(
    <nav>
      <div className="w-[90%] mx-auto p-[2rem]">
        <div className="flex items-center justify-between">
          <div className="flex gap-3 text-4xl text-[var(--primary-color)]">
            <FaBicycle /> Guzo  
            {/* <img src={Logo} alt="Logo" className="text-2xl" /> */}
          </div>

          <div>
            <div>
              <div className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
                { isOpen ?
                <FaTimes className="text-3xl" /> :
                <FaBars className="text-3xl" /> 
                }
              </div>

              <div>
                {/* For Desktop View */} 
                <ul className="hidden lg:flex items-center gap-[2rem] text-xl xl:gap-[3rem] xl:text-2xl">
                  <NavbarLinks />
                </ul>

                {/* For Mobile View */}
                <ul 
                className={`absolute lg:hidden top-24 left-0 w-full bg-white text-xl flex flex-col items-center gap-6 transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
                >
                  <NavbarLinks isOpen={isOpen} />
                </ul>
              </div>              
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
/* ==================================== Navbar End ==================================== */
