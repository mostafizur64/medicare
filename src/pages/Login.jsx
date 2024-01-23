import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/authContext";
import HashLoader from "react-spinners/HashLoader";
const Login = () => {
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const SubmitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const results = await res.json();
      if (!res.ok) {
        throw new Error(results.message);
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: results.data,
          token: results.token,
          role: results.role,
        },
      });

      console.log(results, "login data");

      setLoading(false);
      toast.success(results.message);
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <section>
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10 p-4">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome</span> Back 🍟
        </h3>
        <form onSubmit={SubmitHandler} className="py-4 md:py-0">
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={FormData.email}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16x] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={FormData.password}
              onChange={handleInputChange}
              className="w-full  py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16x] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
            />
          </div>
          <div className="mt-7">
            <button className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg  py-3">
              {loading ? <HashLoader size={35} color="#ffffff" /> : "Login"}
            </button>
          </div>
          <p className="mt-5 text-textColor text-center">
            Don't have and account?
            <Link to="/register" className="text-primaryColor font-medium ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
