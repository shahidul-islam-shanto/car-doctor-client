import login from "../../assets/images/login/login.svg";
import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { logInEmailPassword } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // console.log(email, password);

    logInEmailPassword(email, password)
      .then((result) => {
        const loginUser = result.user;
        console.log(loginUser);
        const user = { email };
        // navigate(location?.state ? location?.state : "/");
        axios
          .post(
            "https://car-doctor-server-bilh9akv6-shahidul-islams-projects-17957188.vercel.app/jwt",
            user,
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res.data);
            if (res.data.success) {
              navigate(location?.state ? location?.state : "/");
            }
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div>
        <div className="bg-nu10 2xl:py-[200px] xl:py-[160px] lg:py-[120px] md:py-[80px] sm:py-[70px] py-[60px]">
          <div className="container-2">
            <div className="grid grid-cols-12 gap-6 items-center">
              <div className="col-span-6">
                <div className="">
                  <img src={login} alt="" />
                </div>
              </div>
              <div className="col-span-6">
                <div className="bg-nu10 border-2 border-[#D0D0D0] px-6 py-10 rounded-lg">
                  <div className="">
                    <form
                      onSubmit={handleLogIn}
                      className="bg-nu10 rounded-2xl w-full px-4 py-4 space-y-4"
                    >
                      <h1 className="text-xl font-bold text-center">Login</h1>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-1 font-semibold"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your email..."
                          className="w-full px-3 py-2 border border-nu60 placeholder:text-nu20 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                      </div>

                      {/* Password */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-1 font-semibold"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          placeholder="Enter your password..."
                          className="w-full px-3 py-2 border border-nu60 placeholder:text-nu20 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full text-nu10 py-2 rounded-xl bg-primary duration-500 cursor-pointer  font-bold"
                      >
                        Login
                      </button>
                    </form>
                    <div className="">
                      <p className="text-nu30 text-center mb-7">
                        Or Sign Up with
                      </p>
                      <div className="flex justify-center items-center gap-4 mb-10">
                        <button className="px-3 py-3 rounded-full bg-nu50">
                          <FaFacebookF />
                        </button>
                        <button className="px-3 py-3 rounded-full bg-nu50">
                          <FaLinkedinIn />
                        </button>
                        <button className="px-3 py-3 rounded-full bg-nu50">
                          <FaGoogle />
                        </button>
                      </div>
                      <div className="">
                        <p className="text-center">
                          Have an account?
                          <Link
                            to={"/register"}
                            className="text-primary font-semibold hover:underline pl-2"
                          >
                            Sign In
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
