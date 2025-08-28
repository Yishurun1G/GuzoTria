import testimony1 from "../assets/images/landingPage/testimony-1.jpg";
import testimony2 from "../assets/images/landingPage/testimony-2.jpg";
import testimony3 from "../assets/images/landingPage/testimony-3.jpg";

function TestimonialList({name, testimony, image}){
  return(
    <div className={`bg-[var(--bg-tertiary)] p-4 rounded-lg max-w-[25%] border-2 border-white flex-1`}>
      <div className="grid place-items-center mt-5 mb-7">
        <div className="w-12 h-12 overflow-hidden rounded-full ">
          <img src={image} alt="testimonies" />
        </div>              
      </div>
      <div className="mb-3 text-center">
        <h2 className="text-lg font-semibold">"{testimony}"</h2>
      </div>
      <div className="mb-3 text-center">
        <p className="text-xl text-[var(--secondary-color)] font-bold">- {name}</p>
      </div>
    </div>
  )
}

/* ==================================== Testimonial Start ==================================== */
export default function Testimonial(){
  return(
    <section>
      <div className="w-[90%] mx-auto text-white">
        <div className="my-[5rem]">
          <h1 className="capitalize text-5xl text-center font-bold">What our riders say</h1>
        </div>

        <div className="flex items-stretch justify-around gap-5 mb-[5rem]">

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
  )
}
/* ==================================== Testimonial End ==================================== */