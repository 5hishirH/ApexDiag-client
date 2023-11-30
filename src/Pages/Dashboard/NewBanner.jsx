import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";

const NewBanner = () => {
  const axiosPublic = useAxiosPublic();

  const handleBanner = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const imgURL = e.target.imgURL.value;
    const title = e.target.title.value;
    const description = e.target.description.value;
    const coupon = e.target.coupon.value;
    const couponRate = e.target.couponRate.value;
    const newBanner = { name, imgURL, title, description, coupon, couponRate };

    axiosPublic
      .post("/banners", newBanner)
      .then((res) => {
        // toast("Test added successfully!")
        toast.success("Banner added successfully!");
      })
      .catch((err) => console.log(err));
  }
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
      <form onSubmit={handleBanner}>
        <div className="grid grid-cols-2">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Banner name</span>
            </label>
            <input
              name="name"
              type="text"
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Banner img url</span>
            </label>
            <input
              name="imgURL"
              type="url"
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Banner title</span>
            </label>
            <input
              name="title"
              type="text"
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Banner description</span>
            </label>
            <input
              name="description"
              type="text"
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Coupon code name</span>
            </label>
            <input
              name="coupon"
              type="text"
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Coupon rate</span>
            </label>
            <input
              name="couponRate"
              type="number"
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

export default NewBanner;
