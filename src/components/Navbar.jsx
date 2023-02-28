import { useState } from "react";
import { NavLink } from "react-router-dom";
import churchLogo from "../assets/jpg/logo.png";
import { RxAvatar } from "react-icons/rx";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleNavClick = () => {
    setNavOpen(!navOpen);
  };

  const handleProfileClick = () => {
    setProfileOpen(!profileOpen);
  };

  return (
    <>
      <nav className=" fixed top-0 left-0 right-0 bg-secondary/20 py-4 drop-shadow-md">
        {/* Nav bar container */}

        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Nav bar hamburger icon */}
          <div className="rounded-md bg-secondary/50 px-1">
            <button
              onClick={handleNavClick}
              id="menu-btn"
              className={`${
                navOpen ? "open" : ""
              } hamburger focus:outline-none md:hidden`}
            >
              <span className="hamburger-top"></span>
              <span className="hamburger-middle"></span>
              <span className="hamburger-bottom"></span>
            </button>
          </div>

          {/* Church Logo */}
          <NavLink to="/">
            <img
              className="h-8 w-auto rounded-md bg-white"
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
                  isActive ? "bg-secondary/50 text-white" : "hover:text-primary"
                } rounded-md px-3 py-1 text-white transition duration-200 ease-in-out`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/B"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary/50 text-white" : "hover:text-primary"
                } rounded-md px-3 py-1 text-white transition duration-200 ease-in-out`
              }
            >
              Team
            </NavLink>
            <NavLink
              to="/C"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary/50 text-white" : "hover:text-primary"
                } rounded-md px-3 py-1 text-white transition duration-200 ease-in-out`
              }
            >
              Calendar
            </NavLink>
            <NavLink
              to="/D"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary/50 text-white" : "hover:text-primary"
                } rounded-md px-3 py-1 text-white transition duration-200 ease-in-out`
              }
            >
              Projects
            </NavLink>
          </ul>

          {/* Avatar */}
          <div onClick={handleProfileClick}>
            <RxAvatar className="h-8 w-8 text-white" />
            <div className={`${profileOpen ? "" : "hidden"}`}>
              <ul className="absolute right-5 top-14 rounded-md bg-white px-6 py-4 font-medium text-secondary">
                <li>Your Profile</li>
                <li>Sign Out</li>
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
        >
          {/* Mobile menu items */}
          <ul className="absolute left-6 right-6 mt-10 flex flex-col items-center justify-center gap-4 bg-secondary/20 py-8 font-bold drop-shadow-md sm:w-auto">
            <NavLink
              onClick={handleNavClick}
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary/50 text-white" : "hover:text-primary"
                } rounded-md px-3 py-1 text-white transition duration-200 ease-in-out`
              }
            >
              Home
            </NavLink>
            <NavLink
              onClick={handleNavClick}
              to="/B"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary/50 text-white" : "hover:text-primary"
                } rounded-md px-3 py-1 text-white transition duration-200 ease-in-out`
              }
            >
              Team
            </NavLink>
            <NavLink
              onClick={handleNavClick}
              to="/C"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary/50 text-white" : "hover:text-primary"
                } rounded-md px-3 py-1 text-white transition duration-200 ease-in-out`
              }
            >
              Calendar
            </NavLink>
            <NavLink
              onClick={handleNavClick}
              to="/D"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary/50 text-white" : "hover:text-primary"
                } rounded-md px-3 py-1 text-white transition duration-200 ease-in-out`
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
