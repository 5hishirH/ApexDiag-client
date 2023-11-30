import React from "react";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const All_Tests = () => {
  const axiosPublic = useAxiosPublic();
  const today = new Date();

  const { data: tests = [], refetch } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tests");
      return res.data;
    },
  });

  return (
    <div className="w-4/5 mx-auto mt-20">
      <div className="grid grid-cols-4 gap-8 mt-8">
        {tests?.filter(e => Number(e?.slots) > 0 && new Date(e?.date) >= today).map((e) => (
          <div className="rounded-xl overflow-hidden shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
            <div className="w-full h-64 overflow-hidden">
              <img
                src={e?.imgURL}
                alt=""
                className="object-cover h-full w-full"
              />
            </div>
            <div className="p-8 flex flex-col">
              <h3 className="text-2xl font-extrabold">
                {e?.testName.slice(0, 32)}
              </h3>
              <p>
                Price : <span>{e?.price}</span>
              </p>
              <p className="text-lg text-green-700 font-medium">
                Date : <span>{e?.date}</span>
              </p>
              <p className="text-sec font-extrabold">Slots: {e?.slots}</p>
              <div className="w-full flex justify-end">
                <Link
                  to={`/tests/${e?._id}`}
                  className="btn btn-md bg-tert text-white font-bold"
                >
                  VIEW DETAILS
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default All_Tests;
