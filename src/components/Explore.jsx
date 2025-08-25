import Button from "./Button";

export default function Explore(){
  return(
    <section>
      <div className="bg-[var(--bg-tertiary)] w-[55%] mx-auto text-white rounded-2xl p-[5rem] border-3 border-white">
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