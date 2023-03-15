import { db } from "./firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "./components/Spinner";
import { toast } from "react-toastify";

function Staff() {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState([]);

  const fetchStaffData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "staffs"));
      const staffData = querySnapshot.docs.map((doc) => ({
        name: doc.data().firstName + " " + doc.data().lastName,
        role: doc.data().position,
        imgUrl: doc.data().imgUrl,
        id: doc.data().id,
      }));
      setPeople(staffData);
      setLoading(false);
    } catch (error) {
      toast.error("Can't fetch staffs data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  return (
    <>
      <section>
        <div
          className="relative grid min-h-[50vh] place-items-center text-4xl font-bold text-white"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1511747813271-99d6710c197d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="z-10 text-5xl">Staff</div>
          <div className="absolute inset-0 z-0 bg-black/50"></div>
        </div>
      </section>

      <section>
        <div className="container mx-auto">
          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-y-20 gap-x-8 px-6 lg:px-8 xl:grid-cols-3">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Meet our staff
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Kolfe Guenet Church is blessed with a dedicated full time
                  staff who handle the day to day operation of the church.{" "}
                  <strong>Here are our staff members.</strong>
                </p>
              </div>

              {/* eslint-disable-next-line */}
              <ul
                role="list"
                className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
              >
                {loading && (
                  <span className="place-self-center">
                    <Spinner />
                  </span>
                )}
                {people.map((person) => (
                  <li key={person.name}>
                    <div className="flex items-center gap-x-6">
                      <div className="grid h-28 w-28 place-items-center overflow-hidden rounded-3xl bg-gray-500 text-3xl text-white">
                        {person.imgUrl ? (
                          <img
                            src={person.imgUrl}
                            alt="Profile Picture"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <>
                            {person.name.split(" ").map((name, index) => {
                              if (index === 0 || index === 1) {
                                return name.charAt(0).toUpperCase();
                              } else {
                                return "";
                              }
                            })}{" "}
                          </>
                        )}
                      </div>
                      <div>
                        <p className="text-lg font-semibold leading-6 text-secondary">
                          {person.role}
                        </p>
                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                          {person.name}
                        </h3>
                        {/* <Link className="">Visit Profile</Link> */}
                        <Link
                          className="text-sm font-medium leading-5 text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:underline focus:outline-none"
                          to={`/profiles/${person.id}`}
                        >
                          Visit Profile
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Staff;
