import React from "react";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const AllBanners = () => {
  const axiosPublic = useAxiosPublic();
  const { data: banners = [], refetch } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banners");
      return res.data;
    },
  });

  const handleClick = (id) => {
    axiosPublic
      .put(`/banners/${id}`, {})
      .then((res) => {
        toast.success("Banner activated successfully!");
        refetch();
      })
      .catch((error) => {
        console.error("Error making PUT request:", error);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "question",
      title: "Do you want to delete this banner?",
      showDenyButton: true,
      confirmButtonText: "No",
      confirmButtonColor: "#bdc3c7",
      denyButtonText: `Yes`,
      denyButtonColor: "#e74c3c",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // stay signed in
      } else if (result.isDenied) {
        // logout
        axiosPublic
          .delete(`/banners/${id}`)
          .then(() => {
            toast.success("Banner deleted successfully");
            refetch();
          })
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <div>
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
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Banner name</th>
              <th>Img URL</th>
              <th>Title</th>
              <th>Coupon code</th>
              <th>Coupon rate</th>
              <th>Delete</th>
              <th>Active banner</th>
            </tr>
          </thead>
          <tbody>
            {banners?.map((e, i) => (
              <tr key={i}>
                <th>{e?.name}</th>
                <td>{e?.imgURL}</td>
                <td>{e?.title}</td>
                <td>{e?.coupon}</td>
                <td>{e?.couponRate} %</td>
                <td>
                  <button onClick={() => handleDelete(e?._id)} className="btn btn-sm btn-error text-white">
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleClick(e?._id)}
                    className={`btn btn-sm btn-block ${
                      e?.isActive ? "btn-success btn-disabled" : "btn-info"
                    }`}
                  >
                    {e?.isActive ? "Activated" : "Make active"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBanners;
