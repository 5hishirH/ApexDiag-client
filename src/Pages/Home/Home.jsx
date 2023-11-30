import React from "react";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import AllTests from "../Dashboard/AllTests";
import All_Tests from "../AllTests/All_Tests";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const { data: banners = [], refetch } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banners");
      return res.data;
    },
  });

  const banner1 = banners?.filter((e) => e?.isActive)[0];

  return (
    <div className="w-full mx-auto">
      <div className="w-4/5 mx-auto h-96 overflow-hidden relative">
        <div className="w-full h-full absolute top-0">
          <img
            src={banner1?.imgURL}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative text-center mt-16">
          <div className="text-5xl text-black">{banner1?.title}</div>
          <div className="text-xl text-black">{banner1?.description}</div>
          <div className="">Use coupon "{banner1?.coupon}"</div>
          <div className="">To get {banner1?.couponRate}% discount</div>
          <Link to={`/all_tests`} className="btn btn-success">
            See all tests
          </Link>
        </div>
      </div>
      <div className="w-full mt-10">
        <div className="w-4/5 mx-auto">
          <h2 className="text-4xl">All featured tests</h2>
        </div>
        <div className="-mt-10"><All_Tests></All_Tests></div>
      </div>
    </div>
  );
};

export default Home;
