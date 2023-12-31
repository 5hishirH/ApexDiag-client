import React from "react";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewTest = () => {
  const axiosPublic = useAxiosPublic();

  const handleNewTest = (e) => {
    e.preventDefault();
    const testName = e.target.testName.value;
    const imgURL = e.target.imgURL.value;
    const details = e.target.details.value;
    const price = e.target.price.value;
    const date = e.target.date.value;
    const slots = e.target.slots.value;

    const testData = { testName, imgURL, details, price, date, slots };

    axiosPublic
      .post("/tests", testData)
      .then((res) => {
        // toast("Test added successfully!")
        toast.success("Test added successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="p-8 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <ToastContainer />
      <form onSubmit={handleNewTest}>
        <div className="grid grid-cols-2">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Test name?</span>
            </label>
            <input
              name="testName"
              type="text"
              placeholder="Type here"
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Test img url</span>
            </label>
            <input
              name="imgURL"
              type="url"
              placeholder="Type here"
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Test Details</span>
            </label>
            <input
              name="details"
              type="text"
              placeholder="Type here"
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              name="price"
              type="number"
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              name="date"
              type="date"
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Slot</span>
            </label>
            <input
              name="slots"
              type="number"
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <div className="mt-8">
          <input
            type="submit"
            value="Add the test"
            className="cursor-pointer btn btn-success"
          />
        </div>
      </form>
    </div>
  );
};

export default NewTest;
