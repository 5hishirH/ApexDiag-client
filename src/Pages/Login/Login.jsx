import React, { useState } from "react";
import useAuthContext from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { handleSignInWithEmailAndPassword, handleGoogleUser, auth, provider } =
    useAuthContext();

  const handleLogin = (e) => {
    e.preventDefault();
    const mail = e.target.email.value;
    const pass = e.target.pass.value;

    handleSignInWithEmailAndPassword(mail, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
        navigate(location?.state ? location?.state : "/");
        Swal.fire({
          icon: "success",
          title: "Login Successfull",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${errorMessage}`,
        });
      });
  };

  return (
    <div className="w-10/12 md:w-1/4 mx-auto">
      <div className="h-[3rem] flex justify-center mt-8">
        <img
          src="https://i.ibb.co/ch1Ljgk/billing.png"
          alt=""
          className="h-full"
        />
      </div>
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-center">Welcome back</h2>
        <form onSubmit={handleLogin} className="mt-6 text-lg">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email:</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@email.com"
              className="input input-bordered input-primary w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password:</span>
            </label>
            <div className="flex items-center">
              <input
                name="pass"
                type={showPass ? "text" : "password"}
                placeholder="Enter your password here"
                className="input input-bordered input-primary w-full"
              />
              <span
                onClick={() => {
                  setShowPass(!showPass);
                }}
                className="cursor-pointer -ml-7"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="mt-8">
            <input
              className={`btn btn-success btn-block`}
              type="submit"
              value="SIGN IN"
            />
            <div className="mt-2 text-sm flex gap-2 justify-center">
              <p className="font-light">Don't have an account?</p>
              <Link
                to={"/register"}
                className={`text-emerald-500 font-semibold`}
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
