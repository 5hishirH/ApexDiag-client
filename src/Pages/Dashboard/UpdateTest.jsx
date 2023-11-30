import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTest = () => {
  const axiosPublic = useAxiosPublic();
  const [test, setTest] = useState()
  const navigate = useNavigate();
  //   const date = new Date(date);
  const param = useParams();
  useEffect(() => {
    axiosPublic.get(`/tests/${param?.id}`).then((res) => {
      setTest(res.data);
    });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const testName = e.target.testName.value;
    const imgURL = e.target.imgURL.value;
    const details = e.target.details.value;
    const price = e.target.price.value;
    const date = e.target.date.value;
    const slots = e.target.slots.value;
    const updatedTest = { testName, imgURL, details, price, date, slots };
    console.log(updatedTest);

    axiosPublic
      .put(`/tests/${param?.id}`, updatedTest)
      .then((res) => {
        toast.success("Test updated successfully!");
        navigate("/dashboard/allTests");
      })
      .catch((error) => {
        console.error("Error making PUT request:", error);
      });
  };
  return (
    <div className="p-8 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-2">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Test name?</span>
            </label>
            <input
              name="testName"
              type="text"
              defaultValue={test?.testName}
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
              defaultValue={test?.imgURL}
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
              defaultValue={test?.details}
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
              defaultValue={test?.price}
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
              defaultValue={test?.date}
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
              defaultValue={test?.slots}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <div className="mt-8">
          <input
            type="submit"
            value="Update the test"
            className="cursor-pointer btn btn-success"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateTest;
