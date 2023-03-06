import CallToAction from "../components/CallToAction";
import CardSection from "../components/CardSection";
import Hero from "../components/Hero";
import Testimonial from "../components/Testimonial";
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
