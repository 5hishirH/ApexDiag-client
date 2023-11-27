import React, { useState } from "react";
import useAuthContext from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import upazila from "../../Data/upazila";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";

const Register = () => {
  // styles
  const registerStyles = {
    text: "text-tert",
    input: "border-primary",
    button: "bg-tert",
  };

  const axiosPublic = useAxiosPublic();

  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const { handleCreateUserWithEmailAndPassword, handleUpdateProfile } =
    useAuthContext();

  const handleRegistration = (e) => {
    e.preventDefault();
    const mail = e.target.email.value;
    const pass = e.target.pass.value;
    const userName = e.target.user_name.value;
    const bloodG = e.target.bloodG.value;
    const upa = e.target.upa.value;
    const imgURL = e.target.profilePicture.value;

    const userData = { mail, userName, imgURL, bloodG, upa };

    handleCreateUserWithEmailAndPassword(mail, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        handleUpdateProfile({
          displayName: userName,
          photoURL: imgURL,
        });
        // ...
        axiosPublic
          .post("/users", userData)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Account created successfully",
            });
            navigate("/");
          })
          .catch((err) => console.log(err));
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
    <div className="w-10/12 md:w-1/4 mx-auto my-10">
      <div className="h-[3rem] flex justify-center">
        <img
          src="https://i.ibb.co/rdw1Rxb/icons8-health-checkup-100-1.png"
          alt=""
          className="h-full"
        />
      </div>
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-center">Create your account</h2>
        <form onSubmit={handleRegistration} className="mt-6 text-lg">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">What should we call you?</span>
            </label>
            <input
              name="user_name"
              type="text"
              placeholder="Your name"
              required
              className="input input-bordered input-primary w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">What is your email?</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@email.com"
              required
              className="input input-bordered input-primary w-full"
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
              required
              className="input input-bordered input-primary w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">What is your blood group?</span>
            </label>
            <select
              name="bloodG"
              defaultValue={"O +ve"}
              required
              className="select select-bordered select-primary w-full"
            >
              <option value={"A +ve"}>A +ve</option>
              <option value={"A -ve"}>A -ve</option>
              <option value={"B +ve"}>B +ve</option>
              <option value={"B -ve"}>B -ve</option>
              <option value={"O +ve"}>O +ve</option>
              <option value={"O -ve"}>O -ve</option>
              <option value={"AB +ve"}>AB +ve</option>
              <option value={"AB -ve"}>AB -ve</option>
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">What is your upazila?</span>
            </label>
            <select
              name="upa"
              defaultValue={"Nawabganj"}
              required
              className="select select-bordered select-primary w-full"
            >
              {upazila?.map(({ id, name }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </select>
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
                required
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
    </div>
  );
};

export default Register;
