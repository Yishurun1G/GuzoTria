import Button from "./Button";

export default function Explore() {
  return (
    <section>
      <div className="bg-[var(--bg-tertiary)] w-full sm:w-[90%] md:w-[70%] lg:w-[60%] mx-auto text-white
        rounded-2xl p-10 sm:p-12 md:p-16 lg:p-20 border-2 sm:border-3 border-white">
        <div className="flex flex-col items-center justify-center">
          {/* Heading */}
          <div className="text-center mb-5 sm:mb-6 md:mb-7">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold">
              Ready to Explore Your City with Guzo?
            </h1>
          </div>

          {/* Paragraph */}
          <div className="text-center w-[90%] sm:w-[85%] md:w-[83%] mx-auto mb-5 sm:mb-6 md:mb-7">
            <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl">
              Join the movement towards sustainable urban mobility. Download the app and start your journey today!
            </p>
          </div>

          {/* Button */}
          <div>
            <Button name="Start riding today" />
          </div>
        </div>
      </div>
    </section>
  );
}
