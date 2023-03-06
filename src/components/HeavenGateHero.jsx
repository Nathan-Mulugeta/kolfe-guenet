function HeavenGateHero() {
  return (
    <section id="HeavenGateHero">
      <div className="hero flex h-full items-end justify-center bg-black/60">
        <div className="hero-content flex w-full flex-col  text-center text-neutral-content md:flex-row md:items-center md:justify-between">
          <h1 className="mb-5 text-4xl font-bold text-accent md:text-5xl">
            Heaven's Gate Project
          </h1>
          <button className="btn-accent btn">Donate</button>
        </div>
      </div>
    </section>
  );
}

export default HeavenGateHero;
