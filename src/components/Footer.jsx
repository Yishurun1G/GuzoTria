import { FaBicycle, FaTwitter, FaFacebook, FaLinkedin, FaYoutube, FaInstagram, FaGooglePlay, FaApple } from "react-icons/fa";

import FooterSocials from "./FooterSocials.jsx";
import FooterAccordionItem from "./FooterAccordionItem.jsx";
import FooterStore from "./FooterStore.jsx";  

export default function Footer(){
  return(
    <footer className="bg-[var(--secondary-color)] text-white py-[10rem]">
      <div className="grid grid-cols-1 gap-4 px-[2rem] lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:gap-2">
        <div className="flex gap-3 text-4xl text-[var(--primary-color)] mb-[3rem]">
          <FaBicycle /> Guzo
        </div>

        <FooterAccordionItem
          title="Join us"
          items={["Careers", "Lime Time Blog", "Press", "Partners"]}
        />

        <FooterAccordionItem
          title="About"
          items={["Community", "E-Bike", "E-Scooter", "Sustainability", "Innovation", "Safety"]}
        />

        <FooterAccordionItem
          title="Programs"
          items={["Advertise", "Lime Access", "Lime Hero", "Lime Assist", "Insurance", "Our Cities"]}
        />

        

        <div className="text-3xl lg:text-xl font-medium">
          <div className="flex flex-col gap-[1.6rem]">
            <h1>Find Locations</h1>
            <h1>Get help</h1>
            <h1>Sitemap</h1>
          </div>
          

          <div className="flex items-center gap-3 text-[var(--secondary-color)] text-4xl mt-[2rem] lg:gap-7">
            <FooterSocials Icon={FaTwitter} />
            <FooterSocials Icon={FaFacebook} />
            <FooterSocials Icon={FaLinkedin} />
            <FooterSocials Icon={FaYoutube} />
            <FooterSocials Icon={FaInstagram} />
          </div>

          <div className="mt-[2rem]">
            <h1 className="mb-[2rem]">Download the free app</h1>
            <div className="flex gap-4 lg:gap-2">
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
                upperTextStyle="text-sm self-start uppercase" 
                lowerText="App Store" 
                lowerTextStyle="text-xl font-extrabold self-start uppercase"
              />
            </div>            
          </div>

          
        </div>
      </div>
    </footer>
  )
}
