import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuthContext from "../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";

const Dashboard = () => {
  const { user } = useAuthContext();
  const axiosPublic = useAxiosPublic();
  const { data: userData = [], refetch } = useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/userRole?email=${user?.email}`);
      return res.data;
    },
  });

  
  const userAdminLink = [
    {
      name: "All Users",
      pageLink: "/dashboard/AllUsers",
    },
    {
      name: "New test",
      pageLink: "/dashboard/newTest",
    },
    {
      name: "All tests",
      pageLink: "/dashboard/allTests",
    },
    {
      name: "New Banner",
      pageLink: "/dashboard/newBanner",
    },
    {
      name: "All banners",
      pageLink: "/dashboard/allBanners",
    },
  ]
  
  const normalLink = [
    {
      name: "My profile",
      pageLink: "/dashboard/profile",
    },
    {
      name: "Upcoming appointment",
      pageLink: "/dashboard/upComing",
    },
    {
      name: "Test result",
      pageLink: "/dashboard/testR",
    },
  ]

  const tabStyles = {
    backgroud: "bg-[#34495e]",
    inactiveNavLink: "font-medium px-6 py-1",
    activeNavLink: "text-white font-bold bg-accent px-6 py-1 rounded-lg",
  };
  return (
    <div className="w-4/5 mx-auto flex gap-10">
      <div className="mt-8 w-1/6">
        <div className="flex flex-col bg-gray-300 rounded-xl p-3">
          {(userData?.role === "admin" ? userAdminLink : normalLink)?.map(({ name, pageLink }, index) => (
            <NavLink
              to={pageLink}
              key={index}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? `text-lg ${tabStyles.activeNavLink}`
                  : `text-lg ${tabStyles.inactiveNavLink}`
              }
            >
              {name}
            </NavLink>
          ))
          }
        </div>
      </div>
      <div className="w-full mt-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
