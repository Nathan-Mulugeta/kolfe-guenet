import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsLockFill } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Spinner from "../components/Spinner";
import signInBackground from "../assets/jpg/signInBackground.jpg";

function SignIn() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("User does not exist");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      setLoading(false);
      toast.error("Could not send reset email");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {loading && (
        <div className="fixed inset-0 z-50 grid h-full w-full place-items-center bg-black/25">
          <Spinner />
        </div>
      )}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${signInBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
      ></div>
      <div className="w-full max-w-md space-y-8">
        <div>
          <MdOutlineAdminPanelSettings className="mx-auto text-7xl text-white " />
          <h2 className="text-center text-lg font-semibold tracking-wide text-gray-100">
            Staffs only
          </h2>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                value={email}
                onChange={onChange}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-t-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                placeholder="Email address *"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                value={password}
                onChange={onChange}
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                required
                className="relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                placeholder="Password *"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-normal focus:ring-secondary"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-white"
              >
                Remember me
              </label>
            </div> */}

            <div className="text-sm">
              <button
                onClick={handleForgotPassword}
                className="font-medium text-white hover:text-black"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-black/60 py-2 px-3 text-sm font-semibold text-white transition-all hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/60 active:scale-95"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <BsLockFill
                  className="h-5 w-5 text-white group-hover:text-primary/40"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
