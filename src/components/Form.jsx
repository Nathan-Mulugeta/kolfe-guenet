function Form() {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form>
      <div className="-mb-32 overflow-hidden shadow sm:rounded-md lg:-mb-40">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              <input
                type="tel"
                placeholder="+251 (XXX)-XXX-XXXX"
                // pattern="+251-{###}-{###}-{####}"
                name="phone-number"
                id="phone-number"
                autoComplete="phone-number"
                maxLength={10}
                className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="email-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <input
                type="text"
                name="email-address"
                id="email-address"
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
                id="interest"
                name="interest"
                className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
              >
                <option>Attending a service</option>
                <option>Joining a ministry or a group</option>
                <option>Attending an event</option>
              </select>
            </div>

            <div className="col-span-6">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your message
              </label>
              <textarea
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
            onClick={onSubmit}
            type="submit"
            className="inline-flex justify-center rounded-md bg-secondary py-2 px-6 text-sm font-semibold text-white shadow-sm transition-transform duration-150 ease-in-out hover:scale-105 hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:scale-95"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
