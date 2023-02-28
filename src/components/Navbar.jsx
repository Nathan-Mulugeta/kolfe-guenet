import { useState } from "react";
import { NavLink } from "react-router-dom";
import churchLogo from "../assets/jpg/logo.png";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  const handleClick = () => {
    setNavOpen(!navOpen);
  };

  return (
    <>
      <nav className=" fixed top-0 left-0 right-0 bg-white py-4 drop-shadow-md">
        {/* Nav bar container */}

        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Nav bar hamburger icon */}

          <button
            onClick={handleClick}
            id="menu-btn"
            className={`${
              navOpen ? "open" : ""
            } hamburger focus:outline-none md:hidden`}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>

          {/* Church Logo */}
          <NavLink to="/">
            <img
              className="h-8 w-auto"
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
                  isActive ? "bg-secondary text-white" : "hover:text-gray-800"
                } rounded-md px-3 py-1 text-gray-400`
              }
            >
              Price
            </NavLink>
            <NavLink
              to="/B"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : "hover:text-gray-800"
                } rounded-md px-3 py-1 text-gray-400`
              }
            >
              Team
            </NavLink>
            <NavLink
              to="/C"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : "hover:text-gray-800"
                } rounded-md px-3 py-1 text-gray-400`
              }
            >
              Calendar
            </NavLink>
            <NavLink
              to="/D"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : "hover:text-gray-800"
                } rounded-md px-3 py-1 text-gray-400`
              }
            >
              Projects
            </NavLink>
          </ul>

          {/* Avatar */}
          <div>Account</div>
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
          <ul className="absolute left-6 right-6 mt-10 flex flex-col items-center justify-center gap-4 bg-white py-8 font-bold drop-shadow-md sm:w-auto">
            <NavLink
              onClick={handleClick}
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : "hover:text-gray-800"
                } rounded-md px-3 py-1 text-gray-400`
              }
            >
              Price
            </NavLink>
            <NavLink
              onClick={handleClick}
              to="/B"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : "hover:text-gray-800"
                } rounded-md px-3 py-1 text-gray-400`
              }
            >
              Team
            </NavLink>
            <NavLink
              onClick={handleClick}
              to="/C"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : "hover:text-gray-800"
                } rounded-md px-3 py-1 text-gray-400`
              }
            >
              Calendar
            </NavLink>
            <NavLink
              onClick={handleClick}
              to="/D"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-secondary text-white" : "hover:text-gray-800"
                } rounded-md px-3 py-1 text-gray-400`
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
