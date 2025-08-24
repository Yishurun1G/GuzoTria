import map from "../assets/images/map.png"
import Button from "./Button"

export default function Why(){
  return(
    <section className="pt-[5rem]">
      <div className="w-[90%] mx-auto bg-gray-100 p-10 rounded-lg">
        <div className="my-[5rem] text-center">
          <h1 className="capitalize text-5xl font-bold mb-7">Interactive map</h1>
          <p className="text-xl text-black/50 w-[43%] mx-auto">Find Guzo scooters and designated parking zones in real-time. Your next ride is just a tap away.</p>
        </div>

        <div className="flex items-center justify-center mb-[5rem]">
          <img src={map} alt="map" />
        </div>

        <div className="text-center mb-[5rem]">
          <Button name="Find a GuzoDot Near You" />
        </div>
      </div>
    </section>
  )
}