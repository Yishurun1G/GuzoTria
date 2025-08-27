import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBicycle, FaTwitter, FaFacebook, FaLinkedin, FaYoutube, FaInstagram, FaGooglePlay, FaApple, FaChevronDown, FaChevronUp } from "react-icons/fa";

function FooterAccordionItem({title, items}){
  const [isOpen, setIsOpen] = useState(false);
  return(
    <div className="text-3xl font-medium lg:text-xl">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h1 className="block">{title}</h1>
        { isOpen ? 
          <FaChevronUp className="text-xl transition-all duration-300 ease-in-out lg:hidden" /> : 
          <FaChevronDown className="text-xl transition-all duration-300 ease-in-out lg:hidden" />
        }
      </div>

      <div 
      className={`flex flex-col gap-4 mt-4 text-xl text-[var(--secondary-color-light)] overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'} 
      lg:max-h-full lg:overflow-visible lg:mt-5 lg:gap-5`}>
        {
          items.map((item, index) => (
            <p key={index}>
              <Link to={item.to}>{item.name}</Link>
            </p>          
          ))
        }
      </div>
    </div>
  )
}

function FooterSocials({Icon, color="#000000"}){
  return(
    <button>
      <Icon className="bg-white p-2 rounded-full cursor-pointer" style={{color}} />
    </button>
  )
}

function FooterStore({Icon, upperText, upperTextStyle, lowerText, lowerTextStyle}) {
  return(
    <button 
    className="flex items-center gap-3 cursor-pointer py-0.5 px-3 rounded-lg bg-white text-black
    lg:gap-2 hover:bg-[var(--primary-color)] hover:text-white transition-all duration-300 ease-in-out">
      <Icon className="text-3xl" /> 
      
      <div className="flex flex-col">
        <p className={upperTextStyle}>{upperText}</p>
        <p className={lowerTextStyle}>{lowerText}</p>
      </div>
    </button>
  )
}

/* ==================================== Footer Start ==================================== */
export default function Footer(){
  return(
    <footer className="bg-[var(--bg-tertiary)] text-white py-[10rem] mt-[5rem]">
      <div className="grid grid-cols-1 gap-4 px-[2rem] lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:gap-2">
        <div className="flex gap-3 text-4xl text-white mb-[3rem]">
          <FaBicycle /> Guzo  
        </div>

        <FooterAccordionItem
          title="Product"
          items={[
            {name: "How it works", to: "product/how-it-works"},
            {name: "Pricing", to: "product/pricing"},
            {name: "Guzo Locations", to: "locations"},
            {name: "Safety", to: "product/safety"}
          ]}
        />

        <FooterAccordionItem
          title="Company"
          items={[
            {name: "About us", to: "/about"},
            {name: "Careers", to: "company/careers"},
            {name: "E-Scooter", to: "company/e-scooter"}, 
            {name: "Partnership", to: "company/partnership"},
            {name: "Blog", to: "/blog"},
          ]}
        />

        <FooterAccordionItem
          title="Resources"
          items={[
            {name: "Help Center", to: "/help"},
            {name: "FAQ's", to: "resources/faq"},
            {name: "Support", to: "resources/support"},
            {name: "Contact Us", to: "resources/contact-us"},
            {name: "Our Cities", to: "resources/our-cities"}
          ]}
        />        

        <div className="text-3xl lg:text-xl font-medium">
          <div className="flex flex-col gap-[1.6rem]">
            <h1>Find Locations</h1>
            <h1>Get help</h1>
            <h1>Sitemap</h1>
          </div>
          
          <div className="flex items-center gap-3 text-[var(--secondary-color)] text-4xl mt-[2rem] lg:gap-7">
            <FooterSocials Icon={FaTwitter} color="#0000FF" />
            <FooterSocials Icon={FaFacebook} color="#0000FF" />
            <FooterSocials Icon={FaLinkedin} color="#0000FF" />
            <FooterSocials Icon={FaYoutube} color="#FF0000" />
            <FooterSocials Icon={FaInstagram} color="#E1306C" />
          </div>

          <div className="mt-[2rem]">
            <h1 className="mb-[2rem]">Download the free app</h1>
            <div className="flex flex-col min-[500px]:flex-row gap-4 lg:gap-2">
              <FooterStore 
                Icon={FaGooglePlay} 
                upperText="Get it on" 
                upperTextStyle="text-lg self-start uppercase lg:text-sm" 
                lowerText="Google Play" 
                lowerTextStyle="text-xl font-extrabold uppercase lg:text-sm"
              />

              <FooterStore 
                Icon={FaApple} 
                upperText="Download on the" 
                upperTextStyle="text-xs self-start uppercase" 
                lowerText="App Store" 
                lowerTextStyle="text-lg font-extrabold self-start uppercase"
              />
            </div>            
          </div>          
        </div>
      </div>
    </footer>
  )
}
/* ==================================== Footer End ==================================== */