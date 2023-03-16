import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { auth, db } from "../firebase.config";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Avatar({ handleSignOut }) {
  const [data, setData] = useState({
    displayName: "",
    photoURL: "",
  });

  const { displayName, photoURL } = data;

  const userRef = doc(db, "staffs", auth.currentUser.uid);

  const fetchProfileData = async () => {
    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const { firstName, lastName, imgUrl } = docSnap.data();
        // Update the form data state with the fetched profile data
        setData({
          ...data,
          displayName: firstName + " " + lastName,
          photoURL: imgUrl,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfileData();
    // eslint-disable-next-line
  }, [data]);

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-gray-400 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary">
          <span className="sr-only">Open user menu</span>
          {!photoURL && displayName && (
            <>
              {displayName.split(" ").map((name, index) => {
                if (index === 0 || index === 1) {
                  return name.charAt(0).toUpperCase();
                } else {
                  return "";
                }
              })}
            </>
          )}

          {photoURL && (
            <img className="object-cover" src={photoURL} alt="Profile pic" />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/profile"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Your Profile
              </Link>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleSignOut}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block w-full px-4 py-2 text-start text-sm text-gray-700"
                )}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Avatar;
