import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import HeavenGate from "./pages/HeavenGate";
import OurBelief from "./pages/OurBelief";
import ContactUs from "./ContactUs";
import Staff from "./Staff";

function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/heaven-gate" element={<HeavenGate />} />
          <Route path="/our-belief" element={<OurBelief />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
