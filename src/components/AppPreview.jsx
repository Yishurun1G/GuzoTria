import Button from "./Button";

export default function AppPreview(){
  return(
    <section className="pt-[5rem]">
      <div className="w-[90%] mx-auto">
        <div className="my-[5rem] text-center">
          <h1 className="capitalize text-5xl font-bold mb-7">Guzo app preview</h1>
          <p className="text-xl text-black/50 w-[43%] mx-auto">Download the Guzo app today to unlock, ride, and park with ultimate convenience.</p>
        </div>

        <div className="flex items-center justify-around mb-[7rem] text-white">
          <div className="bg-red-700 w-[20rem] h-[30rem]">Temporary</div>
          <div className="bg-red-700 w-[20rem] h-[30rem]">Temporary</div>
          <div className="bg-red-700 w-[20rem] h-[30rem]">Temporary</div>
        </div>

        <div className="flex items-center justify-center gap-7 mb-[5rem]">
          <Button name="Find a GuzoDot Near You" />
          <Button name="Find a GuzoDot Near You" />
        </div>
      </div>
    </section>
  )
}