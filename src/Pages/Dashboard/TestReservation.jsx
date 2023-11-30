import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";

const TestReservation = () => {
  const axiosPublic = useAxiosPublic();
  const param = useParams();
  const [test, setTest] = useState()
  
  useEffect(() => {
    axiosPublic.get(`/tests/${param?.id}`).then((res) => {
      setTest(res.data);
      console.log(res.data)
    });
  }, []);

  const handleResult = (e, i) => {
    const result = document.getElementById(`r${i}`);
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Provide Result</th>
              <th>Submit Result</th>
            </tr>
          </thead>
          <tbody>
            {test?.bookedTests.map((e, i) => (
              <tr key={i}>
                <th>{i+1}</th>
                <td>{e}</td>
                <td><input type="text" id={`r${i}`} className="input input-primary input-sm" /></td>
                <td><button onClick={() => handleResult(e, i)} className="btn btn-sm btn-success">SUBMIT</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestReservation;
