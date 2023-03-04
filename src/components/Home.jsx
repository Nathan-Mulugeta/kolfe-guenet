import CallToAction from "./CallToAction";
import CardSection from "./CardSection";
import Hero from "./Hero";
import Testimonial from "./Testimonial";

function Home() {
  return (
    <>
      <Hero />
      <CardSection />
      <div className="divider"></div>
      <CallToAction />
      <Testimonial />
    </>
  );
}

export default Home;
