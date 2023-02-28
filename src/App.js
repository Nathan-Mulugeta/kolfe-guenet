import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import A from "./components/A";
import B from "./components/B";
import C from "./components/C";
import D from "./components/D";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: "80px" }}>
        <Routes>
          <Route path="/" element={<A />} />
          <Route path="/B" element={<B />} />
          <Route path="/C" element={<C />} />
          <Route path="/D" element={<D />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
