import Pagination from "../components/Pagination";

const members = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    age: 28,
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    age: 30,
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Smith",
    age: 25,
  },
];

function Members() {
  return (
    <div className="mt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto overflow-hidden">
        <h3 className="mb-4 mt-4 block cursor-pointer p-2 text-xl font-bold text-secondary sm:text-2xl">
          Members list
        </h3>
        <table className="m-4 mx-auto min-w-[95vw] divide-y divide-gray-200 overflow-hidden rounded-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Age
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {members.map((member) => (
              <tr key={member.id} className="cursor-pointer hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {member.firstName} {member.lastName}
                  <span className="ml-4 text-xs text-gray-500 transition-all hover:text-gray-700 hover:underline">
                    See More
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {member.age}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center">
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default Members;
