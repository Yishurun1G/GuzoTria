import map from "../../assets/images/landingPage/map.png";
import Button from "../Button"

export default function Why(){
  return(
    <section className="py-5 bg-[var(--bg-secondary)]">
      <div className="w-[90%] mx-auto text-white p-10 rounded-lg">
        <div className="my-[5rem] text-center">
          <h1 className="capitalize text-5xl font-bold mb-7">Interactive map</h1>
          <p className="text-xl w-full md:w-[70%] lg:w-[43%] mx-auto">Find Guzo scooters and designated parking zones in real-time. Your next ride is just a tap away.</p>
        </div>

        <div className="flex items-center justify-center mb-[5rem]">
          <img src={map} alt="map" />
        </div>

        <div className="text-center mb-12">
          <Button name="Find a GuzoDot Near You" link="/location" />
        </div>
      </div>
    </section>
  )
}