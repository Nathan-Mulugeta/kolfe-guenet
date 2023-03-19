import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  getCountFromServer,
  startAt,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

function Members() {
  const [members, setMembers] = useState([]);
  const [lastFetchedMember, setLastFetchedMember] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalMembers, setTotalMembers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // const fetchMembers = async () => {
  //   try {
  //     // Get reference
  //     const membersRef = collection(db, "oldMembers");

  //     // Get count
  //     const snapshot = await getCountFromServer(membersRef);
  //     setTotalMembers(snapshot.data().count);

  //     // Create a query
  //     const first = query(membersRef, orderBy("id", "asc"), limit(10));

  //     // Execute query
  //     let querySnap;

  //     if (currentPage === 1) {
  //       // Execute query for the first page
  //       querySnap = await getDocs(first);
  //     } else {
  //       // Execute query for subsequent pages
  //       // const lastDoc = members[currentPage * 10 - 1];
  //       // console.log("If the page is not 1 the last Doc is: ", lastDoc);
  //       const next = query(
  //         membersRef,
  //         orderBy("id", "asc"),
  //         startAfter(lastFetchedMember),
  //         limit(10)
  //       );

  //       querySnap = await getDocs(next);
  //     }

  //     const lastVisible = querySnap.docs[10 - 1];
  //     setLastFetchedMember(lastVisible);

  //     const newMembers = [];

  //     querySnap.forEach((doc) => {
  //       return newMembers.push(doc.data());
  //     });

  //     setMembers(newMembers);
  //     setLoading(false);
  //   } catch (error) {
  //     toast.error("Could not fetch members.");
  //   }
  // };

  const fetchMembers = async () => {
    setLoading(true);
    try {
      // Get reference
      const membersRef = collection(db, "oldMembers");

      // Get count
      const snapshot = await getCountFromServer(membersRef);
      setTotalMembers(snapshot.data().count);

      // Calculate the starting point for the query
      const startIndex = currentPage * 10 + 4;

      // Create a query
      const queryRef = query(
        membersRef,
        orderBy("id", "asc"),
        startAt(startIndex),
        limit(10)
      );

      // Execute query
      const querySnap = await getDocs(queryRef);

      const newMembers = [];

      querySnap.forEach((doc) => {
        newMembers.push(doc.data());
      });

      setMembers(newMembers);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch members.");
    }
  };

  // Fetch users
  useEffect(() => {
    fetchMembers();
  }, [currentPage]);

  return (
    <div className="mt-16 min-h-screen bg-gray-50">
      <div className="container relative mx-auto min-h-screen overflow-hidden">
        <h3 className="mb-4 mt-4 block cursor-pointer p-2 text-xl font-bold text-secondary sm:text-2xl">
          Members list
        </h3>
        {loading && (
          <div className="absolute grid min-h-screen min-w-full place-items-center bg-white/90">
            {<Spinner />}
          </div>
        )}

        <table className=" m-4 mx-auto w-full divide-y divide-gray-200 overflow-hidden rounded-md">
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
                <Link to={`/members/${member.id}`}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {/* Display the name properly as first character uppercase and the rest to be in lowercase */}
                    {member.firstName.toLowerCase().charAt(0).toUpperCase() +
                      member.firstName.slice(1)}{" "}
                    {member.lastName.toLowerCase().charAt(0).toUpperCase() +
                      member.lastName.slice(1)}
                    <span className="ml-4 text-xs text-gray-500 transition-all hover:text-gray-700 hover:underline">
                      See more
                    </span>
                  </td>
                </Link>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {member.age}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {members.length !== 0 && (
          <div className="my-6 flex justify-center overflow-x-auto">
            <Pagination
              currentPage={currentPage}
              totalMembers={totalMembers}
              lastFetchedMember={lastFetchedMember}
              fetchMembers={fetchMembers}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Members;
