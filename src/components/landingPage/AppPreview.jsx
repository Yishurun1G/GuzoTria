import Button from "../Button";

import appReview1 from "../../assets/images/landingPage/appReview-1.png";
import appReview2 from "../../assets/images/landingPage/appReview-2.png";
import appReview3 from "../../assets/images/landingPage/appReview-3.png";

function AppPreviewImages({image}){
  return(
    <div className="flex items-center justify-center overflow-hidden text-xl sm:text-2xl md:text-3xl w-[80%] sm:w-[22rem] md:w-[20rem] h-[20rem] sm:h-[25rem] md:h-[30rem] rounded-xl shadow-lg">
      <img src={image} alt="app preview" className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-150"/>
    </div>
  )
}

export default function AppPreview() {
  return (
    <section>
      <div className="w-[90%] mx-auto text-white">
        {/* ======== Heading & Subtext ======== */}
        <div className="my-10 sm:my-14 md:my-20 text-center">
          <h1 className="capitalize text-3xl sm:text-4xl md:text-5xl font-bold mb-5 sm:mb-7">
            Guzo app preview
          </h1>
          <p className="text-base sm:text-lg md:text-xl w-[90%] sm:w-[70%] md:w-[55%] lg:w-[43%] mx-auto">
            Download the Guzo app today to unlock, ride, and park with ultimate convenience.
          </p>
        </div>

        {/* ======== Preview Images ======== */}
        <div className="flex flex-col sm:flex-col md:flex-row items-center md:items-start justify-center md:justify-around gap-6 sm:gap-8 md:gap-5 mb-16">          
          <AppPreviewImages image={appReview1} />
          <AppPreviewImages image={appReview2} />
          <AppPreviewImages image={appReview3} />          
        </div>

        {/* ======== Buttons ======== */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-7 mb-16">
          <Button name="Find a GuzoDot Near You" />
          <Button name="Take a ride with GuzoDot" />
        </div>
      </div>
    </section>
  );
}
