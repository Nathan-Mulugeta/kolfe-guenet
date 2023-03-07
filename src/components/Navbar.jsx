import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
// import churchLogo from "../assets/jpg/logo.png";
// import churchLogoSvg from "../assets/svg/churchLogoSvg.svg";
import { RxAvatar } from "react-icons/rx";
import { BsChevronDown } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navRef = useRef(null);
  const dropRef = useRef(null);
  const [scroll, setScroll] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);

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

  useEffect(() => {
    document.addEventListener("click", handleProfileClickOutside);
    return () => {
      document.removeEventListener("click", handleProfileClickOutside);
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

  const handleProfileClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setProfileOpen(false);
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

  const handleProfileClick = () => {
    setProfileOpen(!profileOpen);
    setNavOpen(false);
  };

  function handleTopScroll() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const handleDropDownToggle = () => {
    setDropDownOpen(!dropDownOpen);
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

            {/* <img
              className={`h-8 w-auto rounded-md`}
              src={churchLogoSvg}
              alt="Kolfe Guenet Church"
            /> */}
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
                <div className="flex w-36 flex-col divide-y divide-gray-100 rounded-md bg-white text-sm font-semibold text-secondary shadow-lg">
                  <NavLink
                    to="/belief"
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
              <NavLink
                onClick={handleTopScroll}
                to="/C"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-secondary text-white"
                      : "hover:bg-secondary/25"
                  } `
                }
              ></NavLink>
            </div>

            {/* <NavLink
              onClick={handleTopScroll}
              to="/D"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : "hover:bg-secondary/25"
                } rounded-md px-3 py-1 ${
                  scroll ? "text-secondary" : "text-white"
                } transition duration-200 ease-in-out`
              }
            >
              Projects
            </NavLink> */}
          </ul>
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
          <ul className="absolute left-6 right-6 mt-10 flex flex-col items-center justify-center gap-4 rounded-3xl bg-white py-8 font-bold drop-shadow-md sm:w-auto">
            <NavLink
              onClick={handleNavClick}
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : ""
                } rounded-md px-3 py-1 text-secondary transition duration-200 ease-in-out`
              }
            >
              <motion.button
                whileHover={{
                  scale: 1.3,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                }}
              >
                Home
              </motion.button>
            </NavLink>
            <NavLink
              onClick={handleNavClick}
              to="/heaven-gate"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : ""
                } rounded-md px-3 py-1 text-secondary transition duration-200 ease-in-out`
              }
            >
              <motion.button
                whileHover={{
                  scale: 1.3,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                }}
              >
                Heaven's Gate Project
              </motion.button>
            </NavLink>
            <NavLink
              onClick={handleNavClick}
              to="/C"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : ""
                } rounded-md px-3 py-1 text-secondary transition duration-200 ease-in-out`
              }
            >
              <motion.button
                whileHover={{
                  scale: 1.3,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                }}
              >
                Calendar
              </motion.button>
            </NavLink>
            <NavLink
              onClick={handleNavClick}
              to="/D"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : ""
                } rounded-md px-3 py-1 text-secondary transition duration-200 ease-in-out`
              }
            >
              <motion.button
                whileHover={{
                  scale: 1.3,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                }}
              >
                Price
              </motion.button>
            </NavLink>
          </ul>
        </div>
      </nav>
    </>
  );
}
