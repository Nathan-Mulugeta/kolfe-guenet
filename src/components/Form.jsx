import { useRef, useState, useEffect } from "react";
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
  const [invalidInput, setInvalidInput] = useState(null);
  const [progressValue, setProgressValue] = useState(100);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);

  const { firstName, lastName, phone, email, interest, message } = formData;

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setProgressValue(100);
  };

  // Handle input data mutation
  const onMutate = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (firstName === "") {
      setInvalidInput("firstName");
      toast.error("First Name is required");
      firstNameRef.current.scrollIntoView({
        behaviour: "smooth",
        block: "center",
      });
      return;
    }

    if (lastName === "") {
      setInvalidInput("lastName");
      lastNameRef.current.scrollIntoView({
        behaviour: "smooth",
        block: "center",
      });
      toast.error("Last Name is required");
      return;
    }

    const nameRegex = /^[a-zA-Z ]+$/;

    if (!nameRegex.test(firstName)) {
      setInvalidInput("firstName");
      firstNameRef.current.scrollIntoView({
        behaviour: "smooth",
        block: "center",
      });
      toast.error("First Name must contain letters only.");
      return;
    }

    if (!nameRegex.test(lastName)) {
      setInvalidInput("lastName");

      lastNameRef.current.scrollIntoView({
        behaviour: "smooth",
        block: "center",
      });

      toast.error("Last Name must contain letters only.");
      return;
    }

    if (phone === "") {
      setInvalidInput("phone");

      phoneRef.current.scrollIntoView({
        behaviour: "smooth",
        block: "center",
      });

      toast.error("Phone number is required");
      return;
    }

    // Regular expressions to check whether the digits have exactly 10 or 12 digits and Start with either "0" or "+251", followed by exactly 9 digits.
    const phoneRegex = /^(?=.{10,12}$)(0|\+251|251)(9\d|\d{9})$/;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!phoneRegex.test(phone)) {
      setInvalidInput("phone");

      phoneRef.current.scrollIntoView({
        behaviour: "smooth",
        block: "center",
      });
      toast.error("Please enter a valid phone number");
      return;
    }

    if (email !== "" && !emailRegex.test(email)) {
      setInvalidInput("email");

      emailRef.current.scrollIntoView({
        behaviour: "smooth",
        block: "center",
      });

      toast.error("Please enter a valid email address");
      return;
    }

    // If all validations pass
    setInvalidInput(null);

    // clear input fields
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      interest: "",
      message: "",
    });

    // Show success message
    setShowModal(true);
    setTimeout(() => {
      closeModal();
    }, 5000);
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
                ref={firstNameRef}
                required
                value={firstName}
                onChange={onMutate}
                placeholder="eg. John"
                type="text"
                name="firstName"
                id="firstName"
                autoComplete="given-name"
                className={`mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  invalidInput === "firstName"
                    ? "ring-red-500"
                    : "ring-gray-300"
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6`}
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
                ref={lastNameRef}
                value={lastName}
                required
                onChange={onMutate}
                placeholder="eg. Doe"
                type="text"
                name="lastName"
                id="lastName"
                autoComplete="family-name"
                className={`mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  invalidInput === "lastName" ? "ring-red-500" : "ring-gray-300"
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6`}
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
                ref={phoneRef}
                value={phone}
                required
                onChange={onMutate}
                type="tel"
                placeholder="eg. +251 (XXX)-XXX-XXXX"
                // pattern="+251-{###}-{###}-{####}"
                name="phone"
                id="phone"
                autoComplete="phone-number"
                maxLength={12}
                className={`mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  invalidInput === "phone" ? "ring-red-500" : "ring-gray-300"
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6`}
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
                ref={emailRef}
                value={email}
                onChange={onMutate}
                placeholder="eg. johndoe@gmail.com"
                type="text"
                name="email"
                id="email"
                autoComplete="email"
                className={`mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  invalidInput === "email" ? "ring-red-500" : "ring-gray-300"
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6`}
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
                value={interest}
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
                value={message}
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
            className="inline-flex justify-center rounded-md bg-secondary py-2 px-6 text-sm font-semibold text-white shadow-sm transition-transform duration-150 ease-in-out hover:scale-105 hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:scale-95 disabled:bg-gray-200 disabled:hover:scale-100 disabled:active:scale-100"
          >
            Submit
          </button>
        </div>
      </div>
      {showModal &&
        createPortal(
          <Modal
            progressValue={progressValue}
            showModal={showModal}
            setProgressValue={setProgressValue}
            handleClose={closeModal}
          />,
          document.body
        )}
    </form>
  );
}

export default Form;
