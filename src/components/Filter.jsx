import { BsFilter } from "react-icons/bs";
import { Disclosure } from "@headlessui/react";

function Filter({ filter, setFilter }) {
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setFilter((prev) => ({
        ...prev,
        [e.target.id]: !prev[e.target.id],
      }));
    } else {
      setFilter({
        ...filter,
        [e.target.id]: e.target.value,
      });
    }
  };

  return (
    <Disclosure>
      <Disclosure.Button className="col-span-2 flex gap-2 p-2">
        <span>
          <BsFilter className="text-2xl" />
        </span>
        <p>Filter by</p>
      </Disclosure.Button>

      <Disclosure.Panel className="col-span-2 mb-2 bg-white px-4 pt-4 pb-2 text-sm text-gray-500">
        <div className="grid grid-cols-1 justify-items-center">
          <p className="font-semibold">Marital Status</p>
        </div>
        <div className="divider m-0 p-0 "></div>
        <div className="grid grid-cols-1 items-center justify-items-center">
          <input
            onChange={handleChange}
            type="checkbox"
            checked={filter.maritalStatus}
            className="checkbox"
            id="maritalStatus"
          />
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}

export default Filter;
