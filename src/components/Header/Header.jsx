import React, { useContext, useEffect, useRef } from "react";
import logo from "../../assets/images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { AuthContext } from "../../Context/authContext";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/doctors", display: "Find a Doctor" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];
const Header = () => {
  const { user, role, token } = useContext(AuthContext);

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const handleStickyHeader = () => {
    const headerElement = headerRef.current;
    if (headerElement) {
      window.addEventListener("scroll", () => {
        if (
          document.body.scrollTop > 80 ||
          document.documentElement.scrollTop > 80
        ) {
          headerElement.classList.add("sticky_header");
        } else {
          headerElement.classList.remove("sticky_header");
        }
      });
    }
  };
  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  });
  const toggleMenu = () => menuRef.current.classList.toggle("show_menu");
  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* logo   */}
          <div>
            <img src={logo} alt="logo" />
          </div>
          {/* menu  */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "textColor text-[16px] leading-7 hover:text-primaryColor"
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* right nav  */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div className="">
                <Link
                  to={`${
                    role === "doctor"
                      ? "/doctors/profile/me"
                      : "/users/profile/me"
                  }`}
                >
                  <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                    <img
                      src={user?.photo}
                      alt="useImg"
                      className="w-full rounded-full"
                    />
                  </figure>
                  <h2>{user?.name}</h2>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  login
                </button>
              </Link>
            )}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointerF" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
