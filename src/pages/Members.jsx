import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  getCountFromServer,
  startAt,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import { FaSadTear } from "react-icons/fa";

function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMembers, setTotalMembers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchField, setSearchField] = useState("");
  const [lastFetchedMember, setLastFetchedMember] = useState(null);
  const [searchResultsCount, setSearchResultsCount] = useState(0);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      // Get reference
      const membersRef = collection(db, "oldMembers");

      // Get count for first load
      const snapshot = await getCountFromServer(membersRef);
      setTotalMembers(snapshot.data().count);

      // Calculate the starting point for the query
      let startIndex;
      if (currentPage === 1) {
        startIndex = 1;
      } else {
        startIndex = currentPage * 10;
      }

      // Create a query

      const searchValue = searchField.toLowerCase();

      // Get the search value and its corresponding next ASCII character
      const endValue = searchValue + "\uf8ff";

      let queryRef;
      if (searchField) {
        queryRef = query(
          membersRef,
          where("firstName", ">=", searchValue),
          where("firstName", "<=", endValue),
          // orderBy("id", "asc"),
          limit(10)
        );

        // Get count for search results
        const snapshot = await getCountFromServer(
          query(
            membersRef,
            where("firstName", ">=", searchValue),
            where("firstName", "<=", endValue)
          )
        );

        setSearchResultsCount(snapshot.data().count);
      } else {
        queryRef = query(
          membersRef,
          orderBy("id", "asc"),
          startAt(startIndex),
          limit(10)
        );
      }

      // Execute query
      const querySnap = await getDocs(queryRef);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedMember(lastVisible);

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

  // Pagination / Load More of search queries
  const onFetchMoreMembers = async () => {
    try {
      setLoading(true);
      // Get reference
      const membersRef = collection(db, "oldMembers");

      // Create a query

      const searchValue = searchField.toLowerCase();

      // Get the search value and its corresponding next ASCII character
      const endValue = searchValue + "\uf8ff";

      const queryRef = query(
        membersRef,
        where("firstName", ">=", searchValue),
        where("firstName", "<=", endValue),
        // orderBy("id", "asc"),
        startAfter(lastFetchedMember),
        limit(10)
      );

      // Execute query
      const querySnap = await getDocs(queryRef);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedMember(lastVisible);

      const newMembers = [];

      querySnap.forEach((doc) => {
        newMembers.push(doc.data());
      });

      setMembers((prevState) => [...prevState, ...newMembers]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch members.");
    }
  };

  // Fetch users
  useEffect(() => {
    fetchMembers();

    // eslint-disable-next-line
  }, [currentPage, searchField]);

  // Calculate age
  function calculateAge(birthDateString) {
    let today = new Date();
    let birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  return (
    <div className="mt-16 min-h-screen bg-gray-50">
      <div className="container relative mx-auto min-h-screen overflow-hidden">
        <h3 className="mb-4 mt-4 block cursor-pointer p-2 text-xl font-bold text-secondary sm:text-2xl">
          Members list
        </h3>
        <Search
          setSearchResultsCount={setSearchResultsCount}
          searchResultsCount={searchResultsCount}
          searchField={searchField}
          setSearchField={setSearchField}
        />
        {loading && (
          <div className="absolute grid min-h-full min-w-full place-items-center bg-white/90">
            {<Spinner />}
          </div>
        )}

        {members.length !== 0 && (
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
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    <Link to={`/members/${member.id}`}>
                      {/* Display the name properly as first character uppercase and the rest to be in lowercase */}
                      {member.firstName?.toLowerCase().charAt(0).toUpperCase() +
                        member.firstName?.toLowerCase().substring(1)}{" "}
                      {member.lastName?.toLowerCase().charAt(0).toUpperCase() +
                        member.lastName?.toLowerCase().slice(1)}
                      <span className="ml-4 text-xs text-gray-500 transition-all hover:text-gray-700 hover:underline">
                        See more
                      </span>
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {member.dateOfBirth
                      ? calculateAge(member.dateOfBirth) > 0
                        ? calculateAge(member.dateOfBirth)
                        : " - "
                      : " - "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && members.length === 0 && (
          <div className="justify-cente h-screen">
            <center className="m-auto mt-16">
              <div className=" mt-4 w-2/3 tracking-widest sm:w-1/2">
                <span className="block text-6xl text-secondary">
                  <span>
                    <FaSadTear />
                  </span>
                </span>
                <span className="text-xl text-gray-500">
                  There are no members with this name!
                </span>
              </div>
            </center>
          </div>
        )}

        {!loading &&
          searchField &&
          searchResultsCount !== members.length &&
          lastFetchedMember && (
            <div className="m-4 flex justify-center">
              <button
                onClick={onFetchMoreMembers}
                className="btn-secondary btn"
              >
                Load {searchResultsCount - members.length} more
              </button>
            </div>
          )}

        {members.length !== 0 && !searchField && !loading && (
          <div className="my-6 flex justify-center overflow-x-auto">
            <Pagination
              currentPage={currentPage}
              totalMembers={totalMembers}
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
