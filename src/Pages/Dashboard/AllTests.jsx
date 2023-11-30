import React from "react";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllTests = () => {
  const axiosPublic = useAxiosPublic();

  const { data: tests = [], refetch } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tests");
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      icon: "question",
      title: "Do you want to delete this job?",
      showDenyButton: true,
      confirmButtonText: "No",
      confirmButtonColor: "#bdc3c7",
      denyButtonText: `Yes`,
      denyButtonColor: "#e74c3c"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // stay signed in
      } else if (result.isDenied) {
        // logout
        axiosPublic
          .delete(`/tests/${id}`)
          .then(() => {
            toast.success("Test deleted successfully")
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
              <th></th>
              <th>Name</th>
              <th>Reservations</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tests?.map((e, i) => (
              <tr>
                <th>{i + 1}</th>
                <td>{e?.testName}</td>
                <td>
                  <Link className="btn btn-sm btn-primary text-white">
                    Reservations
                  </Link>
                </td>
                <td>
                  <Link to={`/dashboard/updateTest/${e?._id}`} className="btn btn-sm btn-info">Update</Link>
                </td>
                <td>
                  <button onClick={() => {handleDelete(e?._id)}} className="btn btn-sm btn-error text-white">
                    Delete
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

export default AllTests;
