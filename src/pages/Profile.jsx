import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { serverTimestamp, updateDoc, doc, getDoc } from "firebase/firestore";
import { AiOutlinePhone } from "react-icons/ai";
import { auth, db, storage } from "../firebase.config";
import { useEffect, useState, Fragment } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { FaTelegramPlane } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineCamera } from "react-icons/ai";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import CreateStaffMember from "../components/CreateStaffMember.jsx";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import MembersInput from "../components/MembersInput";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
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
  const [modalOpen, setModalOpen] = useState(false);

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
    img,
  } = formData;
  const [uid, setUid] = useState(null);

  // Fetch profile data

  // Create a reference to the user's profile document in Firestore
  const userRef = doc(db, "staffs", auth.currentUser.uid);

  const navigate = useNavigate();

  // Fetch the profile data
  const fetchUserProfile = async () => {
    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
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
      } else {
        setLoading(false);
        toast.error("There is no user with this account");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error fetching profile data");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUserProfile();

    return () => {
      URL.revokeObjectURL(formData.previewImgUrl);
    };
    // eslint-disable-next-line
  }, [formData.previewImgUrl, auth.currentUser]);

  // Add state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If the user is logged in, set the `uid` state to the user's UID
        setUid(user.uid);
      } else {
        // If the user is logged out, set the `uid` state to `null`
        setUid(null);
      }
    });

    return unsubscribe;
  }, []);

  // Handle change
  const handleChange = (e) => {
    // For files
    if (e.target.files) {
      const file = e.target.files[0];
      setFormData((prevState) => ({
        ...prevState,
        img: file,
        previewImgUrl: URL.createObjectURL(file),
      }));
    }

    // For not files
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };

  // On submit
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Data validation
    // First name and last name are required
    if (!firstName || !lastName) {
      toast.error("Please enter your first and last name");
      return;
    }

    // Phone number must be 10 or 12 digits
    const phoneRegex = /^(?=.{10,12}$)(0|\+251|251)(9\d|\d{9})$/;

    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    // Telegram username must not start with "@"
    if (telegramUsername && telegramUsername.match(/^@/)) {
      setLoading(false);
      toast.error('Please enter your Telegram username without the "@" symbol');
      return;
    }

    // Email must be valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setLoading(false);
      toast.error("Please enter a valid email address");
      return;
    }

    // Store image in firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const fileName = `${auth.currentUser.uid}-${image.name}`;

        const storageRef = ref(storage, "images/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const downloadURL = await storeImage(img).catch(() => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    // Update user profile

    // Filter out invalid values
    const formDataCopy = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => {
        return value !== undefined && value !== "" && value !== null;
      })
    );

    // Clear the data to be submitted and set the imgUrl
    formDataCopy.imgUrl = downloadURL;
    formDataCopy.timeStamp = serverTimestamp();
    delete formDataCopy.img;
    URL.revokeObjectURL(formDataCopy.previewImgUrl);
    delete formDataCopy.previewImgUrl;

    // Revoke the previewImgUrl to clear memory
    URL.revokeObjectURL(formData.previewImgUrl);
    delete formData.previewImgUrl;

    // Update in firestore staff collection
    try {
      await updateDoc(userRef, formDataCopy);
      updateProfile(auth.currentUser, {
        displayName: formDataCopy.firstName + " " + formDataCopy.lastName,
        photoURL: formDataCopy.imgUrl,
      });
    } catch (error) {
      setLoading(false);
      toast.error("Can not update profile.");
      console.log(error);
    }

    setLoading(false);
    setEditing(false);
    toast.success("Profile updated successfully.");
  };

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
        <div className="mx-auto w-full sm:px-8">
          {modalOpen ? (
            <div className="bg h-screen">
              <Transition.Root show={modalOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-10"
                  onClose={() => setModalOpen(false)}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-80"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-80"
                  >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>

                  <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary sm:mx-0 sm:h-10 sm:w-10">
                                <AiOutlineInfoCircle className="text-xl text-white" />
                              </div>
                              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <Dialog.Title
                                  as="h3"
                                  className="text-base font-semibold leading-6 text-gray-900"
                                >
                                  You are signed in to the new account
                                </Dialog.Title>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">
                                    You are now in the newly created staff
                                    member profile page.
                                  </p>
                                  <p className="text-sm font-semibold text-secondary">
                                    You can add profile picture, add phone
                                    number and etc in this page by clicking the
                                    edit button.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              type="button"
                              className="inline-flex w-full justify-center rounded-md bg-secondary/90 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary sm:ml-3 sm:w-auto"
                              onClick={() => setModalOpen(false)}
                            >
                              Okay
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
            </div>
          ) : (
            <div className="relative mt-24 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-xl">
              <button
                onClick={() => setEditing(true)}
                className="absolute top-0 right-0 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-b-full bg-secondary/90 p-2 text-white shadow-lg hover:bg-secondary md:hidden"
              >
                <AiFillEdit />
              </button>

              <button
                onClick={() => setEditing(true)}
                className="absolute top-4 right-0 hidden items-center rounded-l-md bg-secondary/90 py-1 px-3 text-sm font-medium text-white shadow transition-all hover:bg-secondary md:flex"
              >
                <AiFillEdit className="mr-2" />
                Edit Profile
              </button>

              <form onSubmit={onSubmit}>
                <div className="px-6">
                  {/* Profile Pic */}
                  {editing ? (
                    <div className="flex justify-center">
                      <input
                        id="imgUrl"
                        type="file"
                        accept=".jpg,.png,.jpeg"
                        max="1"
                        className="hidden"
                        onChange={handleChange}
                      />
                      <label htmlFor="imgUrl" className="relative">
                        <div className="relative -mt-16 grid h-[150px] w-[150px] cursor-pointer place-items-center overflow-hidden rounded-3xl bg-gray-400 text-6xl text-white shadow-xl">
                          {formData.previewImgUrl ? (
                            <img
                              src={formData.previewImgUrl}
                              alt="Preview"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <>
                              {imgUrl ? (
                                <img
                                  src={imgUrl}
                                  alt="Preview"
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <>
                                  {firstName.charAt(0)}
                                  {lastName.charAt(0)}
                                </>
                              )}
                            </>
                          )}

                          <AiOutlineCamera className="absolute bottom-0 z-10 h-1/4 w-full bg-black/50 text-white transition-all " />
                        </div>
                      </label>
                    </div>
                  ) : (
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
                  )}
                  <div className="mt-6 flex flex-col items-center space-y-2 text-center">
                    {/* Position */}
                    {position && (
                      <div className="text-sm font-bold uppercase leading-normal text-secondary">
                        {position}
                      </div>
                    )}

                    {/* Name */}
                    {editing ? (
                      <div>
                        <div className="mb-2">
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            First Name
                          </label>
                          <input
                            id="firstName"
                            className="text-blueGray-700 rounded-md border border-gray-300 p-2 text-xl font-semibold leading-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={firstName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Last Name
                          </label>
                          <input
                            id="lastName"
                            className="text-blueGray-700 rounded-md border border-gray-300 p-2 text-xl font-semibold leading-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={lastName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    ) : (
                      <h3 className="text-blueGray-700 mb-2 p-2 text-xl font-semibold leading-normal">
                        {firstName} {lastName}
                      </h3>
                    )}

                    {/* Phone */}
                    {editing ? (
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone No.
                        </label>
                        <input
                          className="text-blueGray-600 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={phone}
                          id="phone"
                          onChange={handleChange}
                        />
                      </div>
                    ) : (
                      <>
                        {phone && (
                          <div className="text-blueGray-600 p-2">
                            <a
                              href={`tel:+${phone}`}
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
                        )}
                      </>
                    )}

                    {/* Socials */}
                    <div
                      className={`align-center flex ${
                        editing && "flex-col"
                      } justify-center gap-2 ${!editing && "space-x-4s"} p-2`}
                    >
                      {/* Telegram */}
                      {editing ? (
                        <div>
                          <label
                            htmlFor="telegramUsername"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Telegram Username
                          </label>
                          <input
                            id="telegramUsername"
                            className="text-blueGray-600 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={telegramUsername}
                            onChange={handleChange}
                          />
                        </div>
                      ) : (
                        <>
                          {telegramUsername && (
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
                          )}
                        </>
                      )}

                      {/* Facebook */}
                      {editing ? (
                        <div>
                          <label
                            htmlFor="facebookLink"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Facebook Link
                          </label>
                          <input
                            id="facebookLink"
                            className="text-blueGray-600 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={facebookLink}
                            onChange={handleChange}
                          />
                        </div>
                      ) : (
                        <>
                          {facebookLink && (
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
                          )}
                        </>
                      )}

                      {/* Email */}
                      {editing ? (
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            className="text-blueGray-600 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={handleChange}
                          />
                        </div>
                      ) : (
                        <>
                          {email && (
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
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  {/* Bio */}
                  <div className="border-blueGray-200 mt-5 border-t py-10 text-center">
                    <div className="flex justify-center">
                      <div className="w-full px-4 lg:w-9/12">
                        {editing ? (
                          <div className="mb-2">
                            <label
                              htmlFor="bio"
                              className="mb-2 block text-sm font-medium text-gray-700"
                            >
                              Bio
                            </label>
                            <textarea
                              id="bio"
                              className="text-blueGray-700 rounded-md border border-gray-300 p-2 text-xl font-semibold leading-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={bio}
                              onChange={handleChange}
                            />
                          </div>
                        ) : (
                          <p className="text-blueGray-700 mb-4 text-base leading-relaxed sm:text-xl">
                            {bio ?? "No bio yet"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {editing && (
                  <div className="mb-4 grid place-items-center">
                    <button
                      className="btn-secondary btn w-1/2 font-bold text-white"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                )}
              </form>
              {uid === "BiNlXxsG9keRM2yRPb7V3Msmwb82" && (
                <>
                  <CreateStaffMember
                    setLoading={setLoading}
                    setModalOpen={setModalOpen}
                  />
                  <MembersInput setLoading={setLoading} />
                </>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default Profile;
