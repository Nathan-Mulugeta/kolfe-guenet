import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { db } from "../firebase.config";
import { MdLocationPin } from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { MdChildFriendly } from "react-icons/md";

function Member() {
  const [memberData, setMemberData] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const params = useParams();

  const memberRef = doc(db, "oldMembers", params.memberId);

  const fetchMember = async () => {
    try {
      const docSnap = await getDoc(memberRef);
      if (docSnap.exists()) {
        setMemberData(docSnap.data());
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error fetching member data");
      console.log(error);
      navigate("/members");
    }
  };

  useEffect(() => {
    fetchMember();
    // eslint-disable-next-line
  }, []);

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

  let age;

  if (memberData.dateOfBirth) {
    age = calculateAge(memberData.dateOfBirth);
  }

  if (loading)
    return (
      <div className="grid h-screen place-items-center">
        <Spinner />
      </div>
    );

  // console.log(memberData.numberOfChildren);

  return (
    <>
      <div className="relative mx-auto mb-6 mt-36 w-full min-w-0 max-w-md break-words rounded-xl bg-white pb-10 shadow-lg sm:max-w-2xl">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            {/* Avatar */}
            <div className="flex w-full justify-center">
              <div className="relative">
                <div className="relative -mt-16 grid h-[150px] w-[150px] place-items-center overflow-hidden rounded-full bg-gray-400 text-6xl text-white shadow-xl">
                  <>
                    {memberData.firstName.charAt(0).toUpperCase()}
                    {memberData.lastName.charAt(0).toUpperCase()}
                  </>
                </div>
              </div>
            </div>
            {/* Profile name and location */}
            <div className="mt-2 text-center">
              <h3 className="mb-1 text-2xl font-bold leading-normal text-slate-700">
                {memberData.firstName.charAt(0).toUpperCase()}
                {memberData.firstName.substring(1).toLowerCase()}{" "}
                {memberData.lastName.charAt(0).toUpperCase()}
                {memberData.lastName.substring(1).toLowerCase()}
              </h3>
              <div className="mt-0 mb-2  flex items-center justify-center gap-2 text-xs font-bold uppercase text-slate-400">
                {memberData.country && (
                  <>
                    <MdLocationPin className="text-secondary" />
                    {memberData.city} , {memberData.country}
                  </>
                )}
              </div>
            </div>
            <div className="w-full text-center">
              <div className="grid grid-cols-2 justify-items-center gap-2 pt-4 pb-0 sm:grid-cols-4 lg:pt-4">
                {/* Age */}
                <div className="p-3 text-center">
                  <span className="text-sm text-slate-400">Age</span>
                  <span className="block text-xl font-bold tracking-wide text-slate-700">
                    {age ?? "Unknown"}
                  </span>
                </div>

                {/* Gender */}
                <div className="p-3 text-center">
                  <span className="text-sm text-slate-400">Gender</span>
                  <span className="block text-xl font-bold tracking-wide text-slate-700">
                    {memberData.gender.charAt(0).toUpperCase()}
                    {memberData.gender.substring(1).toLowerCase()}
                  </span>
                </div>
                {/* Marital status */}
                <div className="p-3 text-center">
                  <span className="text-sm text-slate-400">Marital Status</span>
                  <span className="block text-xl font-bold tracking-wide text-slate-700">
                    {memberData.maritalStatus.charAt(0).toUpperCase()}
                    {memberData.maritalStatus.substring(1).toLowerCase()}{" "}
                  </span>
                  <p className="text-sm text-slate-400">
                    {memberData.maritalStatus === "Married" ? (
                      <>
                        {memberData.dateOfMarriage && (
                          <>(on {memberData.dateOfMarriage})</>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
                {memberData.maritalStatus === "Married" &&
                  memberData.marriedTo && (
                    <div className="p-3 text-center">
                      <span className="text-sm text-slate-400">Married to</span>
                      <span className="block text-xl font-bold tracking-wide text-slate-700">
                        {
                          memberData.marriedTo
                            .split(" ") // Split the name into an array of first and last names
                            .map((name) => {
                              return (
                                name.charAt(0).toUpperCase() +
                                name.substring(1).toLowerCase()
                              );
                            })
                            .join(" ") // Join the names back into a string
                        }
                      </span>
                    </div>
                  )}

                {/* Academic status */}
                {memberData.academics && (
                  <div className="col-span-2 p-3 text-center">
                    <span className="flex items-center justify-center gap-2 text-sm text-slate-400">
                      <HiOutlineAcademicCap className="text-secondary" />
                      Academics
                    </span>
                    <span className="block text-xl font-bold tracking-wide text-slate-700">
                      {memberData.academics}
                    </span>
                  </div>
                )}

                {/* Number of Children */}
                {memberData.numberOfChildren &&
                (memberData.numberOfChildren !== 0 ||
                  memberData.numberOfChildren !== "0") ? (
                  <div className="col-span-2 p-3 text-center">
                    <span className="flex items-center justify-center gap-2 text-sm text-slate-400">
                      <MdChildFriendly className="text-secondary" />
                      Number of Children
                    </span>
                    <span className="block text-xl font-bold tracking-wide text-slate-700">
                      {memberData.numberOfChildren}
                    </span>
                  </div>
                ) : (
                  ""
                )}

                {/* Date of birth */}
                {memberData.dateOfBirth && (
                  <div className="col-span-2 p-3 text-center">
                    <span className="flex items-center justify-center gap-2 text-sm text-slate-400">
                      Date of Birth
                    </span>
                    <span className="block text-xl font-bold tracking-wide text-slate-700">
                      {memberData.dateOfBirth}
                    </span>
                  </div>
                )}

                {/* Date of membership */}
                {memberData.dateOfMembership && (
                  <div className="col-span-2 p-3 text-center">
                    <span className="flex items-center justify-center gap-2 text-sm text-slate-400">
                      Date of Membership
                    </span>
                    <span className="block text-xl font-bold tracking-wide text-slate-700">
                      {memberData.dateOfMembership}
                    </span>
                  </div>
                )}

                {/* Date of salvation */}
                {memberData.salvationDate && (
                  <div className="col-span-2 p-3 text-center">
                    <span className="flex items-center justify-center gap-2 text-sm text-slate-400">
                      Date of Salvation
                    </span>
                    <span className="block text-xl font-bold tracking-wide text-slate-700">
                      {memberData.salvationDate}
                    </span>
                  </div>
                )}

                {/* Kifle Ketema*/}
                {memberData.kifleKetema && (
                  <div className="col-span-2 p-3 text-center">
                    <span className="flex items-center justify-center gap-2 text-sm text-slate-400">
                      Kifle Ketema
                    </span>
                    <span className="block text-xl font-bold tracking-wide text-slate-700">
                      {memberData.kifleKetema}
                    </span>
                  </div>
                )}

                {/* woreda*/}
                {memberData.woreda && (
                  <div className="col-span-2 p-3 text-center">
                    <span className="flex items-center justify-center gap-2 text-sm text-slate-400">
                      Woreda
                    </span>
                    <span className="block text-xl font-bold tracking-wide text-slate-700">
                      {memberData.woreda}
                    </span>
                  </div>
                )}

                {/* houseNumber*/}
                {memberData.houseNumber && (
                  <div className="col-span-2 p-3 text-center">
                    <span className="flex items-center justify-center gap-2 text-sm text-slate-400">
                      House Number
                    </span>
                    <span className="block text-xl font-bold tracking-wide text-slate-700">
                      {memberData.houseNumber}
                    </span>
                  </div>
                )}

                {/* mPhone*/}
                {memberData.mPhone && (
                  <div className="col-span-2 p-3 text-center">
                    <a href={`tel:${memberData.mPhone}`}>
                      <span className="flex items-center justify-center gap-2 text-sm text-slate-400">
                        Mobile Phone Number
                      </span>
                      <span className="block text-xl font-bold tracking-wide text-slate-700">
                        {memberData.mPhone}
                      </span>
                    </a>
                  </div>
                )}

                {/* email*/}
                {memberData.email && (
                  <div className="col-span-2 p-3 text-center">
                    <a
                      rel="noopener noreferrer"
                      href={`mailto:${memberData.email}`}
                      target="_blank"
                    >
                      <span className="flex items-center justify-center gap-2 text-sm text-slate-400">
                        Email
                      </span>
                      <span className="block text-xl font-bold tracking-wide text-slate-700">
                        {memberData.email}
                      </span>
                    </a>
                  </div>
                )}

                {/* firstLanguage*/}
                {memberData.firstLanguage && (
                  <div className="col-span-2 p-3 text-center">
                    <span className="flex items-center justify-center gap-2 text-sm text-slate-400">
                      First Language
                    </span>
                    <span className="block text-xl font-bold tracking-wide text-slate-700">
                      {memberData.firstLanguage}
                    </span>
                  </div>
                )}

                {/* churchService*/}
                {memberData.churchService && (
                  <div className="col-span-2 p-3 text-center">
                    <span className="flex items-center justify-center gap-2 text-sm text-slate-400">
                      Church Service
                    </span>
                    <span className="block text-xl font-bold tracking-wide text-slate-700">
                      {memberData.churchService}
                    </span>
                  </div>
                )}

                {/* work*/}
                {memberData.work && (
                  <div className="col-span-2 p-3 text-center">
                    <span className="flex items-center justify-center gap-2 text-sm text-slate-400">
                      Work
                    </span>
                    <span className="block text-xl font-bold tracking-wide text-slate-700">
                      {memberData.work}
                    </span>
                  </div>
                )}

                {/* backSlider*/}
                <div className="col-span-2 p-3 text-center">
                  <span className="flex items-center justify-center gap-2 text-sm text-slate-400">
                    Back Slider
                  </span>
                  <span className="block text-xl font-bold tracking-wide text-slate-700">
                    {memberData.backSlider.toString().charAt(0).toUpperCase() +
                      memberData.backSlider
                        .toString()
                        .substring(1)
                        .toLowerCase()}
                  </span>
                </div>

                {/* deceased*/}
                <div className="col-span-2 p-3 text-center">
                  <span className="flex items-center justify-center gap-2 text-sm text-slate-400">
                    Deceased
                  </span>
                  <span className="block text-xl font-bold tracking-wide text-slate-700">
                    {memberData.deceased.toString().charAt(0).toUpperCase() +
                      memberData.deceased.toString().substring(1).toLowerCase()}
                  </span>
                </div>

                {/* churchChange*/}
                <div className="col-span-2 p-3 text-center">
                  <span className="flex items-center justify-center gap-2 text-sm text-slate-400">
                    Church Change
                  </span>
                  <span className="block text-xl font-bold tracking-wide text-slate-700">
                    {memberData.churchChange
                      .toString()
                      .charAt(0)
                      .toUpperCase() +
                      memberData.churchChange
                        .toString()
                        .substring(1)
                        .toLowerCase()}
                  </span>
                </div>

                {/* whereTheyLive */}
                {memberData.whereTheyLive &&
                (memberData.whereTheyLive === "No" ||
                  memberData.whereTheyLive === "Yes") ? (
                  <div className="col-span-2 p-3 text-center">
                    <span className="flex items-center justify-center gap-2 text-sm text-slate-400">
                      Currently live in
                    </span>
                    <span className="block text-xl font-bold tracking-wide text-slate-700">
                      Unknown
                    </span>
                  </div>
                ) : (
                  <div className="col-span-2 p-3 text-center">
                    <span className="flex items-center justify-center gap-2 text-sm text-slate-400">
                      Currently live in
                    </span>
                    <span className="block text-xl font-bold tracking-wide text-slate-700">
                      {memberData.whereTheyLive}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Member;
