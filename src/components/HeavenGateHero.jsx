function HeavenGateHero({ DonateRef }) {
  const scrollToDonate = () => {
    DonateRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section id="HeavenGateHero">
      <div className=" h-full bg-black/50">
        <div className="container hero mx-auto flex h-full items-end justify-center">
          <div className="hero-content flex w-full flex-col  text-center text-neutral-content md:flex-row md:items-center md:justify-between">
            <h1 className="mb-5 text-4xl font-bold text-white md:text-5xl">
              Heaven's Gate Project
            </h1>
            <button className="btn-normal btn" onClick={scrollToDonate}>
              Donate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeavenGateHero;
