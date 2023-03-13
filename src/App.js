import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import HeavenGate from "./pages/HeavenGate";
import OurBelief from "./pages/OurBelief";
import ContactUs from "./ContactUs";
import Staff from "./Staff";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
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
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </Router>
      <ToastContainer transition={Flip} />
    </>
  );
}

export default App;
