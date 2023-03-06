import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import HeavenGate from "./pages/HeavenGate";
import C from "./pages/C";
import D from "./pages/D";

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
          <Route path="/C" element={<C />} />
          <Route path="/D" element={<D />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
