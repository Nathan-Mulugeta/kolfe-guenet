import { motion } from "framer-motion";

const variants = {
  attention: {
    scale: [1, 1.5, 1],
    transition: {
      type: "spring",
      stiffness: 500,
      repeat: "Infinity",
      duration: 2,
      ease: "easeOut",
    },
  },
};

function HeavenGateHero() {
  return (
    <section id="HeavenGateHero">
      <div className="hero flex h-full items-end justify-center bg-black/50">
        <div className="hero-content flex w-full flex-col  text-center text-neutral-content md:flex-row md:items-center md:justify-between">
          <h1 className="mb-5 text-4xl font-bold text-white md:text-5xl">
            Heaven's Gate Project
          </h1>
          <motion.button
            variants={variants}
            animate="attention"
            className="btn-secondary btn"
          >
            Donate
          </motion.button>
        </div>
      </div>
    </section>
  );
}

export default HeavenGateHero;
