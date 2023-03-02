import { FaPeopleArrows } from "react-icons/fa";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section id="hero">
      <div className="bg-secondary/50">
        <div className="container mx-auto flex h-screen flex-col items-center justify-center space-y-8 md:space-y-16 ">
          <div className="flex flex-col items-center space-y-6 px-2 text-center md:px-0">
            <motion.h1
              className="font-glock text-6xl font-bold text-white md:text-8xl"
              initial={{ opacity: 0, x: "-100vw" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, type: "spring", delay: 0.5 }}
            >
              Welcome
            </motion.h1>
            <motion.p
              className="text-xl text-white md:text-2xl"
              initial={{ opacity: 0, x: "100vw" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, type: "spring", delay: 0.5 }}
            >
              Getting started with Kolfe Guenet church.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", delay: 0.5 }}
          >
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 4px 3px rgb(0 0 0 / 0.07)",
              }}
              whileTap={{ scale: 1 }}
              className="flex items-center gap-3 rounded-md bg-secondary/75 py-2 px-6 font-bold text-white transition-all duration-200 ease-in-out"
            >
              <p>Connect with us</p>
              <span className="rounded-full border-2 py-2 px-2">
                <FaPeopleArrows className="text-1xl text-white" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
