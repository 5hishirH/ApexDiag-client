import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosPublic = useAxiosPublic();
  const [userData, setUserData] = useState();

  useEffect(() => {
    axiosPublic
      .get("/users")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
      })
      .catch((error) => {
        console.error("Error making PUT request:", error);
      });
  };

  const handleStatus = (id, status) => {
    if (status === "active") {
      status = "inactive";
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
      })
      .catch((error) => {
        console.error("Error making PUT request:", error);
      });
  };

  return (
    <div className="p-8 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      {userData?.map((e, index) => (
        <div
          key={index}
          className="w-full flex justify-between items-center mt-4 border-2 border-primary rounded-md px-6 py-4"
        >
          <div>{e?.userName}</div>
          <div>{e?.mail}</div>
          <button className="btn btn-accent btn-sm">Details</button>
          <button onClick={() => makeAdmin(e?._id, e?.role)} className="btn btn-info btn-sm">make { e?.role === "admin" ? "normal" : "admin"}</button>
          <button
            onClick={() => handleStatus(e?._id, e?.status)}
            className={`btn ${
              e?.status === "active" ? "btn-success" : "btn-error"
            } btn-sm`}
          >
            {e?.status === "active" ? "Active" : "Inactive"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllUsers;
