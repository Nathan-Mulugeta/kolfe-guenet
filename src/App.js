import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import B from "./components/B";
import C from "./components/C";
import D from "./components/D";

function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/B" element={<B />} />
          <Route path="/C" element={<C />} />
          <Route path="/D" element={<D />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
