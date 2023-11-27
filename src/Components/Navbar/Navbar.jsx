import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdCloseFullscreen } from "react-icons/md";
import useAuthContext from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  // replace with actual user data
  const { user, handleSignOut } = useAuthContext();
  //...
  const [open, setOpen] = useState(false);
  const [hoverEffect, setHoverEffect] = useState(false);
  // replace with actual public navlinks
  const publicNavlinks = [
    {
      name: "Home",
      pageLink: "/",
    },
  ];

  // replace with actual private navlinks
  const privateNavlinks = [
    {
      name: "Dashboard",
      pageLink: "/dashboard",
    },
  ];

  // basic navbar styles
  const navbarStyles = {
    backgroud: "bg-[#34495e]",
    inactiveNavLink: "text-[#ecf0f1] font-medium",
    activeNavLink: "text-primary font-bold",
  };

  //   Log in btn styles
  const loginBtnStyle = {
    backgroud: "bg-emerald-600",
    textColor: "text-white",
  };

  //   Log out btn styles
  const logoutBtnStyle = {
    backgroud: "bg-orange-500",
    textColor: "text-white",
  };

  // functions
  const handleLogOut = () => {
    Swal.fire({
      icon: "question",
      title: "Do you want to signout?",
      showDenyButton: true,
      confirmButtonText: "No",
      confirmButtonColor: "#12AF83",
      denyButtonText: `Yes`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // stay signed in
      } else if (result.isDenied) {
        // logout
        handleSignOut()
          .then(() => {
            Swal.fire("Logout Successfull!", "", "success");
          })
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <div
      className={`${navbarStyles.backgroud} shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
    >
      <div className="w-11/12 lg:w-4/5 mx-auto py-5 lg:py-6 flex items-center justify-between">
        {/* Logo Part */}
        <div className="flex items-center gap-3 lg:gap-4">
          <span
            onClick={() => {
              setOpen(!open);
            }}
            className="cursor-pointer block lg:hidden text-xl pt-1 mr-2 text-white"
          >
            {open ? <MdCloseFullscreen /> : <FiMenu />}
          </span>
          <div className="h-8 w-8 lg:h-10 lg:w-10">
            <img
              src="https://i.ibb.co/bd1Vxk3/icons8-health-checkup-100.png"
              alt="logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-xl lg:text-2xl font-bold">
            <span className="text-success">Apex</span>
            <span className="text-primary">Diag</span>
          </div>
        </div>
        {/* Navlinks and user info */}
        <div className="flex items-center gap-20">
          {/* navlinks */}
          <div
            className={`text-lg font-medium ${
              open ? "" : "hidden lg:flex"
            } absolute lg:relative top-16 left-0 lg:top-auto lg:left-auto w-full py-4 lg:py-0 lg:w-fit ${
              navbarStyles.backgroud
            } shadow-[0_16px_10px_-10px_rgb(0,0,0,0.2)] lg:shadow-none`}
          >
            <div className="w-11/12 mx-auto flex flex-col lg:flex-row gap-4">
              {publicNavlinks?.map(({ name, pageLink }, i) => (
                <NavLink
                  to={pageLink}
                  key={i}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? `text-lg ${navbarStyles.activeNavLink}`
                      : `text-lg ${navbarStyles.inactiveNavLink}`
                  }
                >
                  {name}
                </NavLink>
              ))}
              {user
                ? privateNavlinks?.map(({ name, pageLink }, i) => (
                    <>
                      <NavLink
                        to={pageLink}
                        key={i}
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? `text-lg ${navbarStyles.activeNavLink}`
                            : `text-lg ${navbarStyles.inactiveNavLink}`
                        }
                      >
                        {name}
                      </NavLink>
                      <button
                        onClick={handleLogOut}
                        className={`btn btn-error text-white btn-sm inline-block lg:hidden w-fit`}
                      >
                        LOGOUT
                      </button>
                    </>
                  ))
                : ""}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="avatar online">
                  <div
                    onMouseOver={() => setHoverEffect(true)}
                    onMouseLeave={() => setHoverEffect(false)}
                    className="w-8 rounded-full border border-white"
                  >
                    <img
                      src={
                        user.photoURL
                          ? user.photoURL
                          : "https://i.ibb.co/GRmXjRc/icons8-avatar-96.png"
                      }
                      alt=""
                      className="h-full w-full"
                    />
                  </div>
                  <div
                    className={`top-12 left-1/2 -translate-x-1/2 absolute bg-white text-black font-medium px-2 py-1 rounded w-20 h-8 text-center ${
                      hoverEffect ? "visible" : "invisible"
                    }`}
                  >
                    {user?.displayName}
                  </div>
                </div>
                <button
                  onClick={handleLogOut}
                  className={`btn btn-error text-white hidden lg:inline-block`}
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <NavLink
                to={"/login"}
                className={`btn btn-success btn-sm lg:btn-md`}
              >
                LOGIN
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
