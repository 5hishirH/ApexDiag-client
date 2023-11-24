import React, { useState } from "react";
import useAuthContext from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  // styles
  const registerStyles = {
    text: "text-tert",
    input: "border-tert",
    button: "bg-tert",
  };

  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const { handleCreateUserWithEmailAndPassword, handleUpdateProfile, handleSignInWithGoogle } =
    useAuthContext();

  const handleRegistration = (e) => {
    e.preventDefault();
    const mail = e.target.email.value;
    const pass = e.target.pass.value;
    const username = e.target.user_name.value;
    const imgURL = e.target.profilePicture.value;

    handleCreateUserWithEmailAndPassword(mail, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        handleUpdateProfile({
          displayName: username,
          photoURL: imgURL,
        });
        // ...
        navigate("/login");
        Swal.fire({
          icon: "success",
          title: "Account created successfully",
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
    <div className="w-10/12 md:w-1/5 mx-auto my-10">
      <div className="h-[3rem] flex justify-center">
        <img
          src="https://i.ibb.co/ch1Ljgk/billing.png"
          alt=""
          className="h-full"
        />
      </div>
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-center">Create your account</h2>
        <form onSubmit={handleRegistration} className="mt-6 text-lg">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">What is your email?</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@email.com"
              className="input input-bordered input-secondary w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">What should we call you?</span>
            </label>
            <input
              name="user_name"
              type="text"
              placeholder="Your name"
              className="input input-bordered input-secondary w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Paste your profile picture url</span>
            </label>
            <input
              name="profilePicture"
              type="url"
              defaultValue={null}
              placeholder="https://www.your-profile-picture.com"
              className="input input-bordered input-secondary w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="flex items-center">
              <input
                name="pass"
                type={showPass ? "text" : "password"}
                placeholder="Enter your password here"
                className="input input-bordered input-secondary w-full"
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
              value="CREATE ACCOUNT"
            />
            <div className="mt-2 text-sm flex gap-2 justify-center">
              <p className="font-light">Already have an account?</p>
              <Link to={"/login"} className={`text-emerald-500 font-semibold`}>
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className="divider my-8">OR</div>
      <button
        onClick={handleSignInWithGoogle}
        className={`btn btn-outline btn-block`}
      >
        Continue with Google
      </button>
    </div>
  );
};

export default Register;
