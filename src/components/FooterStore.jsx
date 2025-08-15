export default function FooterStore({Icon, upperText, upperTextStyle, lowerText, lowerTextStyle}) {
  return(
    <button 
    className="flex items-center gap-3 cursor-pointer py-0.5 px-3 rounded-lg bg-white text-[var(--secondary-color)]
     lg:gap-2 hover:bg-[var(--primary-color)] hover:text-white transition-all duration-300 ease-in-out
    ">
      <Icon className="text-3xl" /> 
      <div className="flex flex-col">
        <p className={upperTextStyle}>{upperText}</p>
        <p className={lowerTextStyle}>{lowerText}</p>
      </div>
    </button>
  )
}