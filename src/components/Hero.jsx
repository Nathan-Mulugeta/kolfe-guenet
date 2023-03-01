import { FaPeopleArrows } from "react-icons/fa";

function Hero() {
  return (
    <section id="hero">
      <div className="md:bg-secondary/20">
        <div className="container mx-auto flex h-screen flex-col items-center justify-center space-y-8 md:space-y-16 ">
          <div className="flex flex-col items-center space-y-6 px-2 text-center md:px-0">
            <h1 className="font-glock text-6xl font-bold text-white md:text-8xl">
              Welcome
            </h1>
            <p className="text-xl text-white md:text-2xl">
              Getting started with Kolfe Guenet church.
            </p>
          </div>
          <button className="flex items-center gap-3 rounded-md bg-secondary/75 py-2 px-6 font-bold text-white transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl">
            <p>Connect with us</p>
            <span className="rounded-full border-2 py-2 px-2">
              <FaPeopleArrows className="text-1xl text-white" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
