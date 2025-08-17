export default function NavbarLinks({isOpen}){
  const links = ["About us", "Why Lime", "Vehicles", "Locations", "Advertise", "Blog", "Help"];

  return(
    <>
      { links.map((link, index) => (
        <li className={`hover:text-[var(--secondary-color-light)] ${isOpen ? "last:mb-5" : ""} transition-all cursor-pointer`} key={index}>{link}</li>
      ))
      }
    </>
  )
}