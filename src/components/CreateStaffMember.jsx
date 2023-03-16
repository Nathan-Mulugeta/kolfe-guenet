import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../firebase.config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

function CreateStaffMember({ setLoading, setModalOpen }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: firstName + " " + lastName,
      });

      const formDataCopy = { ...formData, id: user.uid };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "staffs", user.uid), formDataCopy);
      setLoading(false);
      setModalOpen(true);
    } catch (error) {
      setLoading(false);
      toast.error(
        "Something went wrong. Can't create a new staff member at the moment."
      );
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Add new staff member
        </h1>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label
              className="mb-1 block font-medium text-gray-700"
              htmlFor="fullname"
            >
              First Name
            </label>
            <input
              onChange={onChange}
              value={firstName}
              className="w-full rounded-lg border border-gray-400 p-3 transition duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter first name"
              required
            />
          </div>
          <div>
            <label
              className="mb-1 block font-medium text-gray-700"
              htmlFor="fullname"
            >
              Last Name
            </label>
            <input
              onChange={onChange}
              value={lastName}
              className="w-full rounded-lg border border-gray-400 p-3 transition duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter last name"
              required
            />
          </div>
          <div>
            <label
              className="mb-1 block font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              onChange={onChange}
              value={email}
              className="w-full rounded-lg border border-gray-400 p-3 transition duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              required
            />
          </div>
          <div>
            <label
              className="mb-1 block font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              onChange={onChange}
              value={password}
              className="w-full rounded-lg border border-gray-400 p-3 transition duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </div>
          <div>
            <button
              className="w-full rounded-lg bg-green-500 py-3 px-4 text-white transition duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateStaffMember;
