import React from "react";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAuthContext from "../../Providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TestDetails = () => {
  const { user } = useAuthContext();
  const axiosPublic = useAxiosPublic();
  const param = useParams();

  const { data: test = [], refetch } = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tests/${param?.id}`);
      return res.data;
    },
  });

  const handleBooking = (id) => {
    axiosPublic
      .put(`/tests?email=${user?.email}`, { id })
      .then((res) => {
        toast.success("Test booked successfully!");
        refetch();
      })
      .catch((error) => {
        console.error("Error making PUT request:", error);
      });
  };

  return (
    <div className="w-4/5 mx-auto mt-24">
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
      <div className="grid grid-cols-2 gap-10">
        <div className="h-96 overflow-hidden rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
          <img
            src={test?.imgURL}
            alt=""
            className="object-cover h-full w-full"
          />
        </div>
        <div className="leading-relaxed">
          <h2 className="text-2xl">{test?.testName}</h2>
          <p className="mt-4">{test?.details}</p>
          <p className="mt-2">{test?.date}</p>
          <p className="mt-2">{test?.slots} slots available</p>
          <button
            onClick={() => handleBooking(test?._id)}
            className="btn btn-primary btn-md btn-outline mt-6"
          >
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
