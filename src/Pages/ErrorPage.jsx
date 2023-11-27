import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen grid grid-cols-2">
      <div className="flex items-center">
        <div className="ml-20 pl-12 border-l-8 border-primary">
          <h2 className="text-9xl">Sorry !</h2>
          <p className="text-4xl mt-12">Couldn't find the webpage</p>
          <Link className="btn btn-success mt-8">RETURN TO HOME</Link>
        </div>
      </div>
      <div className="bg-[url(https://i.ibb.co/FJcChcS/diag404.jpg)] bg-no-repeat bg-cover bg-center shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]"></div>
    </div>
  );
};

export default ErrorPage;
