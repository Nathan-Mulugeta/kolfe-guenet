import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "./Avatar";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/jpg/logo.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [signedIn, setSignedIn] = useState(false);

  const location = useLocation();

  const navigation = [
    { name: "Home", to: "/" },
    { name: "Heaven's Gate Project", to: "/heaven-gate" },
    { name: "Our Belief", to: "/our-belief" },
    { name: "Staff", to: "/staff" },
    { name: "Contact Us", to: "/contact-us" },
  ].map((item) => ({
    ...item,
    current: location.pathname === item.to,
  }));

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

  // Log out user
  const navigate = useNavigate();

  // Handle user sign out
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
      <Menu
        as="nav"
        className="fixed top-0 left-0 right-0 z-50 bg-white drop-shadow-md"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                  {/* Hamburger icon*/}

                  <Menu.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Menu.Button>
                </div>

                {/* Logo and Desktop nav menus */}
                <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                  {/* Logo */}
                  <div className="flex flex-shrink-0 items-center">
                    <NavLink to="/">
                      <img
                        className="block h-8 w-auto lg:hidden"
                        src={Logo}
                        alt="Kolfe Guenet Church"
                      />
                    </NavLink>
                  </div>

                  {/* Desktop nav menus */}
                  <div className="hidden md:ml-6 md:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className={classNames(
                            item.current
                              ? "bg-secondary text-white"
                              : "text-gray-500 hover:bg-secondary/75 hover:text-white",
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

                {/* Avatar or sign in */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  {signedIn ? (
                    <Avatar handleSignOut={handleSignOut} />
                  ) : (
                    <NavLink
                      to="/sign-in"
                      className={`rounded-full px-4 py-2 text-sm font-semibold  ring-1 ring-secondary hover:bg-secondary hover:text-white hover:ring-0`}
                    >
                      Sign In
                    </NavLink>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile menu */}
            <Transition
              enter="transition ease-out duration-300 "
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Menu.Items className="sm:hidden">
                <div className="absolute w-screen flex-auto overflow-hidden rounded-b-3xl bg-white text-sm leading-6 ring-1 ring-gray-900/5">
                  <div className="space-y-1 p-4">
                    {navigation.map((item) => (
                      <Menu.Item key={item.name}>
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className={classNames(
                            item.current
                              ? "bg-secondary text-white"
                              : "text-black hover:bg-secondary/50 hover:text-white",
                            "block rounded-md px-3 py-2 text-base font-medium"
                          )}
                        >
                          {item.name}
                        </NavLink>
                      </Menu.Item>
                    ))}
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
}
