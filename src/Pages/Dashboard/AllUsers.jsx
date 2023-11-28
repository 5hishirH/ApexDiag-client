import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const AllUsers = () => {
  const axiosPublic = useAxiosPublic();

  const { data: userData = [], refetch } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });

  const makeAdmin = (id, role) => {
    if (role === "admin") {
      role = "normal";
    } else {
      role = "admin";
    }

    const updatedRole = { role };

    console.log(updatedRole);

    axiosPublic
      .put(`/users/${id}`, updatedRole)
      .then((res) => {
        Swal.fire({
          title: "Role of the account changed successfully",
          text: "",
          icon: "success",
        });
        refetch();
      })
      .catch((error) => {
        console.error("Error making PUT request:", error);
      });
  };

  const handleStatus = (id, status) => {
    if (status === "active") {
      status = "blocked";
    } else {
      status = "active";
    }

    const updatedStatus = { status };

    axiosPublic
      .put(`/users/${id}`, updatedStatus)
      .then((res) => {
        Swal.fire({
          title: "Status changed successfully",
          text: "",
          icon: "success",
        });
        refetch();
      })
      .catch((error) => {
        console.error("Error making PUT request:", error);
      });
  };

  return (
    <div className="p-8 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Info</th>
              <th>Change role</th>
              <th>Change status</th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((e, index) => (
              <tr key={index}>
                <th>{index+1}</th>
                <th>{e?.userName}</th>
                <td>{e?.mail}</td>
                <td>
                  <div>
                    <button
                      className="btn btn-accent btn-sm"
                      onClick={() =>
                        document.getElementById(`my_modal_${index}`).showModal()
                      }
                    >
                      See Info
                    </button>
                    <dialog id={`my_modal_${index}`} className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <div className="flex items-center gap-6">
                          <div className="avatar">
                            <div className="w-16 rounded-full">
                              <img src={e?.imgURL} />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl">{e?.userName}</h3>
                            <p className="italic">{e?.mail}</p>
                          </div>
                        </div>
                        <div className="mt-6 pl-2">
                          <p>
                            <span className="font-medium">Blood Group : </span>
                            <span>{e?.bloodG}</span>
                          </p>
                          <p>
                            <span className="font-medium">Upazila : </span>
                            <span>{e?.upa}</span>
                          </p>
                          <p>
                            <span className="font-medium">Role : </span>
                            <span>{e?.role}</span>
                          </p>
                          <p>
                            <span className="font-medium">Status : </span>
                            <span>{e?.status}</span>
                          </p>
                        </div>
                      </div>
                    </dialog>
                  </div>
                </td>
                <td>
                  <div className="w-32">
                    <button
                      onClick={() => makeAdmin(e?._id, e?.role)}
                      className="btn btn-block btn-info btn-sm"
                    >
                      Make {e?.role === "admin" ? "normal" : "admin"}
                    </button>
                  </div>
                </td>
                <td>
                  <div className="w-20">
                    <button
                      onClick={() => handleStatus(e?._id, e?.status)}
                      className={`btn btn-block ${
                        e?.status === "active"
                          ? "btn-success"
                          : "btn-error text-white"
                      } btn-sm`}
                    >
                      {e?.status === "active" ? "Active" : "blocked"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
