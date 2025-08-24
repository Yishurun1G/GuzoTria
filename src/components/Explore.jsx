import Button from "./Button";

export default function Explore(){
  return(
    <section className="pt-[5rem]">
      <div className="bg-[var(--primary-color)] w-[55%] mx-auto text-white rounded-2xl py-[5rem] px-[5rem]">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center mb-7">
            <h1 className="text-5xl font-bold">Ready to Explore Your City with Guzo?</h1>
          </div>

          <div className="text-center w-[83%] mx-auto mb-7">
            <p className="text-xl">Join the movement towards sustainable urban mobility. Download the app and start your journey today!</p>
          </div>

          <div>
            <Button name="Start riding today" />
          </div>
          <div></div>
        </div>
      </div>
    </section>
  )
}