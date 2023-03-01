import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import churchLogo from "../assets/jpg/logo.png";
import { RxAvatar } from "react-icons/rx";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navRef = useRef(null);
  const [scroll, setScroll] = useState(false);

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
          <div className={`${scroll ? "" : "rounded-md bg-secondary/50"} px-1`}>
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
          </div>

          {/* Church Logo */}
          <NavLink to="/">
            <img
              className={`h-8 w-auto rounded-md bg-white`}
              src={churchLogo}
              alt="Kolfe Guenet Church"
            />
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
              to="/B"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : "hover:bg-secondary/25"
                } rounded-md px-3 py-1 ${
                  scroll ? "text-secondary" : "text-white"
                } transition duration-200 ease-in-out`
              }
            >
              Team
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
                  isActive
                    ? "bg-secondary text-white"
                    : "hover:text-secondary/50"
                } rounded-md px-3 py-1 text-secondary transition duration-200 ease-in-out`
              }
            >
              Home
            </NavLink>
            <NavLink
              onClick={handleNavClick}
              to="/B"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-secondary text-white"
                    : "hover:text-secondary/50"
                } rounded-md px-3 py-1 text-secondary transition duration-200 ease-in-out`
              }
            >
              Team
            </NavLink>
            <NavLink
              onClick={handleNavClick}
              to="/C"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-secondary text-white"
                    : "hover:text-secondary/50"
                } rounded-md px-3 py-1 text-secondary transition duration-200 ease-in-out`
              }
            >
              Calendar
            </NavLink>
            <NavLink
              onClick={handleNavClick}
              to="/D"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-secondary text-white"
                    : "hover:text-secondary/50"
                } rounded-md px-3 py-1 text-secondary transition duration-200 ease-in-out`
              }
            >
              Price
            </NavLink>
          </ul>
        </div>
      </nav>
    </>
  );
}
