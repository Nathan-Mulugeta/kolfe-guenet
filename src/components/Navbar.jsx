import { useState, useRef, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";
import { NavLink, useNavigate } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef(null);
  const dropRef = useRef(null);
  const [scroll, setScroll] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const svgVariant = {
    hidden: {
      // scale: 100,
    },
    visible: {
      // scale: [100, 0.5, 1],
      transition: {
        duration: 3,
        ease: "easeInOut",
        type: "spring",
        stiffness: 300,
      },
    },
  };

  const pathVariant = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
      transition: {
        duration: 3,
        ease: "easeInOut",
      },
    },
  };

  const handleScrollForNav = () => {
    setNavOpen(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollForNav);
    return () => {
      window.removeEventListener("scroll", handleScrollForNav);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleNavClickOutside);
    return () => {
      document.removeEventListener("click", handleNavClickOutside);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleDropDownClickOutside);
    return () => {
      document.removeEventListener("click", handleDropDownClickOutside);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const handleDropDownClickOutside = (event) => {
    if (dropRef.current && !dropRef.current.contains(event.target)) {
      setDropDownOpen(false);
    }
  };

  const handleNavClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setNavOpen(false);
    }
  };

  const handleNavClick = () => {
    setNavOpen(!navOpen);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  function handleTopScroll() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setNavOpen(!navOpen);
    setDropDownOpen(false);
  }

  const handleDropDownToggle = () => {
    setDropDownOpen(!dropDownOpen);
  };

  // Handle user signed in or not

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    });

    return unsubscribe;
  }, []);

  const navigate = useNavigate();

  // Log out user

  const handleSignInClick = async () => {
    setLoading(true);
    try {
      if (signedIn) {
        await auth.signOut();
        setSignedIn(false);
        setLoading(false);
      } else {
        navigate("/sign-in");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Can not sign out.");
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 py-4 drop-shadow-md transition duration-500 ${
          scroll ? "bg-white shadow-md" : "bg-transparent"
        }`}
        ref={navRef}
      >
        {/* Nav bar container */}

        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Nav bar hamburger icon */}
          <motion.div
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.9,
            }}
            className={`${scroll ? "" : "rounded-md bg-secondary/50"} px-1`}
          >
            <button
              onClick={() => {
                setNavOpen(!navOpen);
              }}
              id="menu-btn"
              className={`${
                navOpen ? "open" : ""
              } hamburger focus:outline-none md:hidden`}
            >
              <span
                className={`${scroll ? "bg-black" : "bg-white"} hamburger-top`}
              ></span>
              <span
                className={`${
                  scroll ? "bg-black" : "bg-white"
                } hamburger-middle`}
              ></span>
              <span
                className={`${
                  scroll ? "bg-black" : "bg-white"
                } hamburger-bottom`}
              ></span>
            </button>
          </motion.div>

          {/* Church Logo */}
          <NavLink to="/" onClick={handleTopScroll}>
            <motion.svg
              className={`w-auto rounded-md`}
              variants={svgVariant}
              initial="hidden"
              animate="visible"
              width="40"
              height="40"
              viewBox="0 0 562 562"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                variants={pathVariant}
                d="M141 321.5H416M141 321.5L115.5 429H436.5L416 321.5M141 321.5L121 332.5L88 455H320M416 321.5H436.5L465.5 455H358M320 455V500C327.667 491.5 346 479.6 358 500V455M320 455H358"
                stroke="#D1233A"
                strokeWidth="10"
              />
              <motion.path
                variants={pathVariant}
                d="M410.5 136H126V174.5H410.5V136Z"
                stroke="#D42037"
                strokeWidth="10"
              />
              <motion.path
                variants={pathVariant}
                d="M243.5 511.5V41H297.5V511.5H243.5Z"
                stroke="#D1233A"
                strokeWidth="10"
              />
              <motion.circle
                variants={pathVariant}
                cx="281"
                cy="281"
                r="275"
                stroke="#55A6D9"
                strokeWidth="12"
              />
              <motion.path
                variants={pathVariant}
                d="M178 55.5439C178 55.5439 163 60.5877 163 66.5439C163 72.5 164 66.5439 170.5 100.544C175.955 129.079 195.424 168.544 205.5 184.544C205.5 184.544 230 217.044 245.5 226.044C293 241.044 310 236.544 312.5 236.544C326.5 232.544 324 232.544 330 232.544C356.5 230.044 366 252.544 366 250.044C371.2 230.444 367.167 215.877 364.5 211.044C360.5 204.544 351 204.344 349.5 203.044C342 196.544 342.5 196.044 340 190.544C338 186.144 342.5 180.044 345 177.544C370 147.544 375.325 109.71 378 99.5439C380.5 90.0439 381 23.0439 378 25.0439C375 27.0439 341 100.044 320 124.044C299 148.044 278 149.044 274 149.044C236.8 151.444 194.5 87.7105 178 55.5439Z"
                stroke="#55A6D9"
                strokeWidth="10"
              />
              <motion.circle
                variants={pathVariant}
                cx="350.5"
                cy="219.5"
                r="5.5"
                fill="#55A6D9"
              />
            </motion.svg>
          </NavLink>

          {/* Menu items */}
          <ul className="hidden grow items-center justify-start gap-8 px-8 md:flex">
            <NavLink
              to="/"
              onClick={handleTopScroll}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : "hover:bg-secondary/25"
                } rounded-md px-3 py-1 ${
                  scroll ? "text-secondary" : "text-white"
                } transition duration-200 ease-in-out`
              }
            >
              Home
            </NavLink>
            <NavLink
              onClick={handleTopScroll}
              to="/heaven-gate"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : "hover:bg-secondary/25"
                } rounded-md px-3 py-1 ${
                  scroll ? "text-secondary" : "text-white"
                } transition duration-200 ease-in-out`
              }
            >
              Heaven's Gate Project
            </NavLink>

            {/* Drop Down */}
            <div
              ref={dropRef}
              className={`${
                scroll ? "text-secondary" : "text-white"
              } relative cursor-pointer rounded-md  px-3 py-1 transition duration-200 ease-in-out hover:bg-secondary/25`}
            >
              <div
                onClick={handleDropDownToggle}
                className=" flex items-center justify-between space-x-4"
              >
                <p>About</p>
                <BsChevronDown
                  className={`text-sm ${
                    scroll ? "text-secondary" : "text-white"
                  }`}
                />
              </div>
              <div
                className={`absolute left-2 mt-2 ${
                  dropDownOpen ? "block" : "hidden"
                }`}
              >
                <div className="flex w-36 flex-col divide-y divide-gray-100 overflow-hidden rounded-b-md bg-white text-sm font-semibold text-secondary shadow-lg">
                  <NavLink
                    onClick={handleTopScroll}
                    to="/our-belief"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "bg-secondary text-white"
                          : "hover:bg-secondary/25"
                      } px-4 py-2 ${
                        scroll ? "text-secondary" : ""
                      } transition duration-100 ease-in-out`
                    }
                  >
                    Our Belief
                  </NavLink>
                  <NavLink
                    onClick={handleTopScroll}
                    to="/staff"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "bg-secondary text-white"
                          : "hover:bg-secondary/25"
                      } px-4 py-2 ${
                        scroll ? "text-secondary" : ""
                      } transition duration-100 ease-in-out`
                    }
                  >
                    Staff
                  </NavLink>
                  <NavLink
                    onClick={handleTopScroll}
                    to="contact-us"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "bg-secondary text-white"
                          : "hover:bg-secondary/25"
                      } px-4 py-2 ${
                        scroll ? "text-secondary" : ""
                      } transition duration-100 ease-in-out`
                    }
                  >
                    Contact Us
                  </NavLink>
                </div>
              </div>
            </div>
          </ul>

          {/* Sign in/out button */}

          <button
            onClick={handleSignInClick}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              scroll ? "text-secondary ring-secondary hover:text-white" : "text-white ring-white"
            } ${
              loading
                ? "cursor-wait bg-white/80"
                : "transition-all duration-300 ease-in-out"
            } ring-1 hover:ring-0 hover:bg-black`}
            disabled={loading}
          >
            {signedIn ? "Sign Out" : "Sign In"}
            {loading && (
              <span className="ml-2 animate-spin">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-4 w-4 animate-spin"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-3.647z"
                  ></path>
                </svg>
              </span>
            )}
          </button>
        </div>

        {/* Menu items for mobile */}

        {/* Menu items container */}
        <div
          className={`${
            navOpen ? "opacity-100" : "-translate-x-full opacity-0"
          } transition duration-150 ease-in-out md:hidden
          `}
          ref={navRef}
        >
          {/* Mobile menu items */}
          <ul className="absolute left-6 right-6 mt-10 flex flex-col items-start justify-center gap-4 rounded-3xl bg-white py-8 font-bold drop-shadow-md sm:w-auto">
            <NavLink
              onClick={handleNavClick}
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : "hover:bg-secondary/25"
                } w-full px-3 py-1 pl-10 text-secondary transition duration-200 ease-in-out`
              }
            >
              Home
            </NavLink>
            <NavLink
              onClick={handleNavClick}
              to="/heaven-gate"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : "hover:bg-secondary/25"
                } w-full px-3 py-1 pl-10 text-secondary transition duration-200 ease-in-out`
              }
            >
              Heaven's Gate Project
            </NavLink>

            <NavLink
              onClick={handleTopScroll}
              to="/our-belief"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : "hover:bg-secondary/25"
                } w-full px-3 py-1 pl-10 text-secondary transition duration-200 ease-in-out`
              }
            >
              Our Belief
            </NavLink>
            <NavLink
              onClick={handleTopScroll}
              to="/staff"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : "hover:bg-secondary/25"
                } w-full px-3 py-1 pl-10 text-secondary transition duration-200 ease-in-out`
              }
            >
              Staff
            </NavLink>
            <NavLink
              onClick={handleTopScroll}
              to="contact-us"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : "hover:bg-secondary/25"
                } w-full px-3 py-1 pl-10 text-secondary transition duration-200 ease-in-out`
              }
            >
              Contact Us
            </NavLink>
          </ul>
        </div>
      </nav>
    </>
  );
}
