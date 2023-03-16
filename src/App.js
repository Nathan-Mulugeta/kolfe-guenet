import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import HeavenGate from "./pages/HeavenGate";
import OurBelief from "./pages/OurBelief";
import ContactUs from "./pages/ContactUs";
import Staff from "./pages/Staff";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import StaffProfile from "./pages/StaffProfile";
import Members from "./pages/Members";

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
            <Route path="/profiles/:profileId" element={<StaffProfile />} />

            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/members" element={<PrivateRoute />}>
              <Route path="/members" element={<Members />} />
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
