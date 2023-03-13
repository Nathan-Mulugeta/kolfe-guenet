import { useState, useRef, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";
import { NavLink, useNavigate } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Avatar from "./Avatar";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", to: "/", current: true },
  { name: "Heaven's Gate Project", to: "/heaven-gate", current: false },
  { name: "Our Belief", to: "/our-belief", current: false },
  { name: "Staff", to: "/staff", current: false },
  { name: "Contact Us", to: "/contact-us", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef(null);
  const dropRef = useRef(null);
  const [scroll, setScroll] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

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
  const handleSignOut = async () => {
    try {
      if (signedIn) {
        await auth.signOut();
        setSignedIn(false);
        navigate("/sign-in");
      }
    } catch (error) {
      toast.error("Can not sign out.");
    }
  };

  return (
    <>
      {/* From Tailwind */}
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  {signedIn ? (
                    <Avatar handleSignOut={handleSignOut} />
                  ) : (
                    <NavLink
                      to="/sign-in"
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        scroll
                          ? "text-secondary ring-secondary hover:text-white"
                          : "text-white ring-white"
                      } ring-1 hover:bg-black hover:ring-0`}
                    >
                      Sign In
                    </NavLink>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button>
                    <NavLink
                      key={item.name}
                      // as="a"
                      to={item.to}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </NavLink>
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
