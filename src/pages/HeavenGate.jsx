import HeavenGateHero from "../components/HeavenGateHero";
import ContentSection from "../components/ContentSection.jsx";
import Donation from "../components/Donation";
import { useRef } from "react";

function HeavenGate() {
  const DonateRef = useRef(null);

  return (
    <section>
      <HeavenGateHero DonateRef={DonateRef} />
      <ContentSection />
      <Donation DonateRef={DonateRef} />
    </section>
  );
}

export default HeavenGate;
