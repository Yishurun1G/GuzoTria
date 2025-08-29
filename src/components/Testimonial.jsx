import testimony1 from "../assets/images/landingPage/testimony-1.jpg";
import testimony2 from "../assets/images/landingPage/testimony-2.jpg";
import testimony3 from "../assets/images/landingPage/testimony-3.jpg";

function TestimonialList({ name, testimony, image }) {
  return (
    <div className="bg-[var(--bg-tertiary)] p-5 md:p-6 lg:p-7 rounded-lg w-full sm:w-[80%] md:w-[48%] lg:w-[32%] xl:w-[30%] max-w-[400px] shadow-[0_0.5rem_2rem_rgba(255,255,255,0.3)] transition-transform duration-300 hover:scale-105">
      <div className="grid place-items-center mt-5 mb-7">
        <div className="w-14 h-14 md:w-16 md:h-16 overflow-hidden rounded-full shadow-md">
          <img src={image} alt="testimonies" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="mb-3 text-center">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-xl font-medium italic">
          "{testimony}"
        </h2>
      </div>
      <div className="mb-3 text-center">
        <p className="text-lg md:text-xl text-[var(--secondary-color)] font-bold">- {name}</p>
      </div>
    </div>
  );
}

/* ==================================== Testimonial Start ==================================== */
export default function Testimonial() {
  return (
    <section>
      <div className="w-[90%] mx-auto text-white">
        {/* ======= Heading ======= */}
        <div className="my-10 md:my-14 lg:my-20">
          <h1 className="capitalize text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center font-bold">
            What our riders say
          </h1>
        </div>

        {/* ======= Testimonial Cards ======= */}
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center lg:justify-between xl:justify-around gap-8 md:gap-6 lg:gap-8 xl:gap-10 mb-16">
          <TestimonialList
            image={testimony1}
            testimony="Guzo has transformed my daily commute! It's so convenient and environmentally friendly."
            name="Sara L."
          />

          <TestimonialList
            image={testimony2}
            testimony="Exploring the city has never been this fun and easy. The app is super user-friendly!"
            name="Abel D."
          />

          <TestimonialList
            image={testimony3}
            testimony="I love the commitment to sustainability. Guzo is making a real difference in urban mobility."
            name="Meron N."
          />
        </div>
      </div>
    </section>
  );
}
/* ==================================== Testimonial End ==================================== */
