import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { db } from "../firebase.config";
import { FaTelegramPlane } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { AiOutlinePhone } from "react-icons/ai";

function StaffProfile() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    telegramUsername: "",
    bio: "",
    facebookLink: "",
    imgUrl: "",
    img: {},
  });

  const {
    firstName,
    lastName,
    email,
    phone,
    position,
    telegramUsername,
    bio,
    facebookLink,
    imgUrl,
  } = formData;

  const params = useParams();

  const fetchProfileData = async () => {
    try {
      const userRef = doc(db, "staffs", params.profileId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const {
          firstName = "",
          lastName = "",
          email = "",
          phone = "",
          position = "",
          telegramUsername = "",
          bio = "",
          facebookLink = "",
          imgUrl = "",
        } = docSnap.data();
        // Update the form data state with the fetched profile data
        setFormData({
          ...formData,
          firstName,
          lastName,
          email,
          phone,
          position,
          telegramUsername,
          bio,
          facebookLink,
          imgUrl,
        });

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Can't fetch profile data.");
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <section
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1530569673472-307dc017a82d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="bg-normal pt-16 pb-10"
    >
      {loading ? (
        <div className="grid h-screen w-screen place-items-center bg-white/75">
          <Spinner />
        </div>
      ) : (
        <div className="mx-auto w-full px-8">
          <div className="relative mt-24 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-xl">
            <div className="px-6">
              {/* Profile Pic */}

              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4">
                  <div className="relative">
                    {/* Initials */}

                    <div className="relative -mt-16 grid h-[150px] w-[150px] place-items-center overflow-hidden rounded-3xl bg-gray-400 text-6xl text-white shadow-xl">
                      {imgUrl ? (
                        <img
                          alt="..."
                          src={imgUrl}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <>
                          {firstName.charAt(0)}
                          {lastName.charAt(0)}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col items-center space-y-2 text-center">
                {/* Position */}
                {position && (
                  <>
                    <div className="text-sm font-bold uppercase leading-normal text-secondary">
                      {position}
                    </div>
                  </>
                )}

                {/* Name */}
                <h3 className="text-blueGray-700 mb-2 p-2 text-xl font-semibold leading-normal">
                  {firstName} {lastName}
                </h3>

                {/* Phone */}
                {phone && (
                  <>
                    <div className="text-blueGray-600 p-2">
                      <a
                        href={`tel:${phone}`}
                        className="hover:bg-secondary-dark flex items-center gap-2 rounded-lg bg-secondary p-2 text-white transition-all hover:scale-105 active:scale-95"
                      >
                        <span className="text-3xl">
                          <AiOutlinePhone />
                        </span>
                        <span className="text-base font-bold md:text-lg">
                          {phone}
                        </span>
                      </a>
                    </div>
                  </>
                )}

                {/* Socials */}
                <div className={`align-center flex justify-center gap-2  p-2`}>
                  {/* Telegram */}
                  {telegramUsername && (
                    <>
                      <a
                        rel="noopener noreferrer"
                        href={`https://t.me/${telegramUsername}`}
                        aria-label="telegram"
                        target="_blank"
                        className="rounded-md p-2 text-secondary transition-all hover:scale-150 hover:text-black"
                      >
                        <FaTelegramPlane
                          style={{
                            width: "20",
                            height: "20",
                          }}
                        />
                      </a>
                    </>
                  )}

                  {/* Facebook */}
                  {facebookLink && (
                    <>
                      <a
                        rel="noopener noreferrer"
                        href={facebookLink}
                        aria-label="facebook"
                        target="_blank"
                        className="rounded-md p-2 text-secondary transition-all hover:scale-150 hover:text-black"
                      >
                        <BsFacebook
                          style={{
                            width: "20",
                            height: "20",
                          }}
                        />
                      </a>
                    </>
                  )}

                  {/* Email */}
                  {email && (
                    <>
                      <a
                        rel="noopener noreferrer"
                        href={`mailto:${email}`}
                        aria-label="Email"
                        target="_blank"
                        className="rounded-md p-2 text-secondary transition-all hover:scale-150 hover:text-black"
                      >
                        <svg
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 fill-current"
                        >
                          <path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path>
                        </svg>
                      </a>
                    </>
                  )}
                </div>
              </div>
              {/* Bio */}
              <div className="border-blueGray-200 mt-5 border-t py-10 text-center">
                <div className="flex justify-center">
                  <div className="w-full px-4 lg:w-9/12">
                    <p className="text-blueGray-700 mb-4 text-base leading-relaxed sm:text-xl">
                      {bio === "" ? "No bio yet" : bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default StaffProfile;
