import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
// import churchLogo from "../assets/jpg/logo.png";
// import churchLogoSvg from "../assets/svg/churchLogoSvg.svg";
import { RxAvatar } from "react-icons/rx";
import { motion } from "framer-motion";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navRef = useRef(null);
  const [scroll, setScroll] = useState(false);

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
  };

  const handleProfileClick = () => {
    setProfileOpen(!profileOpen);
    setNavOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 py-4 drop-shadow-md transition duration-500 ${
          scroll ? "bg-normal shadow-md" : "bg-transparent"
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
              onClick={handleNavClick}
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
          <NavLink to="/">
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
            <NavLink
              to="/C"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : "hover:bg-secondary/25"
                } ${
                  scroll ? "text-secondary" : "text-white"
                } rounded-md px-3 py-1  transition duration-200 ease-in-out`
              }
            >
              Calendar
            </NavLink>
            <NavLink
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
            </NavLink>
          </ul>

          {/* Avatar */}
          <div
            onClick={handleProfileClick}
            ref={profileRef}
            className="relative"
          >
            <button>
              <RxAvatar
                className={`h-8 w-8 ${
                  scroll ? "text-secondary" : "text-white"
                } transition-all duration-500 ease-in-out `}
              />
            </button>
            <div className={`${profileOpen ? "" : "hidden"}`}>
              <ul className="absolute right-1 flex w-36  flex-col gap-2 rounded-md bg-white px-6 py-4 font-medium text-secondary transition-all duration-1000 ease-in-out">
                <Link
                  className="hover:text-secondary/75"
                  onClick={handleProfileClick}
                >
                  <li>Your Profile</li>
                </Link>
                <Link
                  className="hover:text-secondary/75"
                  onClick={handleProfileClick}
                >
                  <li>Sign Out</li>
                </Link>
              </ul>
            </div>
          </div>
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
