import { useState } from "react";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import Modal from "./Modal";

function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    interest: "",
    message: "",
  });
  const [showModal, setShowModal] = useState(false);

  const { firstName, lastName, phone, email, interest, message } = formData;

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Handle input data mutation
  const onMutate = (e) => {
    if (e.target.value) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (firstName === "") {
      toast.error("First Name is required");
      return;
    }

    if (lastName === "") {
      toast.error("Last Name is required");
      return;
    }

    if (phone === "") {
      toast.error("Phone number is required");
      return;
    }

    // Regular expressions to validate phone number and email
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setShowModal(true);
  };

  const isDisabled = firstName === "" || lastName === "" || phone === "";

  return (
    <form>
      <div className="-mb-32 overflow-hidden shadow sm:rounded-md lg:-mb-40">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <input
                required
                onChange={onMutate}
                placeholder="eg. John"
                type="text"
                name="firstName"
                id="firstName"
                autoComplete="given-name"
                className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <input
                required
                onChange={onMutate}
                placeholder="eg. Doe"
                type="text"
                name="lastName"
                id="lastName"
                autoComplete="family-name"
                className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              <input
                required
                onChange={onMutate}
                type="tel"
                placeholder="eg. +251 (XXX)-XXX-XXXX"
                // pattern="+251-{###}-{###}-{####}"
                name="phone"
                id="phone"
                autoComplete="phone-number"
                maxLength={10}
                className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <input
                onChange={onMutate}
                placeholder="eg. johndoe@gmail.com"
                type="text"
                name="email"
                id="email"
                autoComplete="email"
                className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="interest"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Interest
              </label>
              <select
                onChange={onMutate}
                id="interest"
                name="interest"
                className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
              >
                <option>Be a member</option>
                <option>Joining a ministry or a group</option>
                <option>Attending an event</option>
              </select>
            </div>

            <div className="col-span-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your message
              </label>
              <textarea
                onChange={onMutate}
                placeholder="How can we help you?"
                type="text"
                name="message"
                id="message"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-6 text-right sm:px-6">
          <button
            disabled={isDisabled}
            onClick={onSubmit}
            type="submit"
            className="inline-flex justify-center rounded-md bg-secondary py-2 px-6 text-sm font-semibold text-white shadow-sm transition-transform duration-150 ease-in-out hover:scale-105 hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:scale-95 disabled:bg-gray-400 disabled:hover:scale-100 disabled:active:scale-100"
          >
            Submit
          </button>
        </div>
      </div>
      {showModal &&
        createPortal(<Modal handleClose={closeModal} />, document.body)}
    </form>
  );
}

export default Form;
