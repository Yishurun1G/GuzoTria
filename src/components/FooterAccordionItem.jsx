import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function FooterAccordionItem({title, items}){
  const [isOpen, setIsOpen] = useState(false);
  return(
    <div className="text-3xl font-medium lg:text-xl">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h1 className="block">{title}</h1>
        { isOpen ? <FaChevronUp className="text-xl transition-all duration-300 ease-in-out lg:hidden" /> : <FaChevronDown className="text-xl transition-all duration-300 ease-in-out lg:hidden" />}
      </div>

      <div 
      className={`flex flex-col gap-4 mt-4 text-xl text-[var(--secondary-color-light)] overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'} 
       lg:max-h-full lg:overflow-visible lg:mt-5 lg:gap-5`}>
        {
          items.map((item, index) => (
            <p key={index} className="">{item}</p>
          ))
        }
      </div>
    </div>
  )
}