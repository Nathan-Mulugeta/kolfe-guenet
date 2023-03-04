import CallToAction from "./CallToAction";
import CardSection from "./CardSection";
import Hero from "./Hero";
import Testimonial from "./Testimonial";
import { useRef } from "react";

function Home() {
  const ctaRef = useRef(null);

  return (
    <>
      <Hero ctaRef={ctaRef} />
      <CardSection />
      <div className="divider"></div>
      <CallToAction ctaRef={ctaRef} />
      <Testimonial />
    </>
  );
}

export default Home;
