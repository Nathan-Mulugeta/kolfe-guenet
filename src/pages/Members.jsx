import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination";
import { db } from "../firebase.config";

function Members() {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    try {
      // Get reference
      const membersRef = collection(db, "oldMembers");

      // Create a query
      const q = query(membersRef, orderBy("id", "asc"), limit(10));

      // Execute query
      const querySnap = await getDocs(q);

      // const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      // setLastFetchedListing(lastVisible)

      const newMembers = [];

      querySnap.forEach((doc) => {
        return newMembers.push(doc.data());
      });

      setMembers(newMembers);
      // setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listings");
    }
  };
  // Fetch users
  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="mt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto overflow-hidden">
        <h3 className="mb-4 mt-4 block cursor-pointer p-2 text-xl font-bold text-secondary sm:text-2xl">
          Members list
        </h3>
        <table className="m-4 mx-auto w-full divide-y divide-gray-200 overflow-hidden rounded-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                id
              </th>
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
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {member.id}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {/* Display the name properly as first character uppercase and the rest to be in lowercase */}
                  {member.firstName.toLowerCase().charAt(0).toUpperCase() +
                    member.firstName.slice(1)}{" "}
                  {member.lastName.toLowerCase().charAt(0).toUpperCase() +
                    member.lastName.slice(1)}
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
