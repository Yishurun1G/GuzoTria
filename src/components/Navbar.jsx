import { useState } from "react";
import { FaBicycle, FaBars, FaTimes } from "react-icons/fa";

import NavbarLinks from "./NavbarLinks";

export default function Navbar(){
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(){
    setIsOpen(!isOpen);
  }

  return(
    <nav>
      <div className="w-[90%] mx-auto p-[2rem]">
        <div className="flex items-center justify-between">
          <div className="flex gap-3 text-4xl text-[var(--primary-color)]">
            <FaBicycle /> Guzo  
          </div>

          <div>
            <div className="">
              <div className="lg:hidden" onClick={handleClick}>
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