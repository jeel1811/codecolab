import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 to-blue-300">
      <div className="w-[400px] bg-[#1E1E2F] p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Create Account
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Create your account
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="relative mb-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={data.firstName}
              onChange={handleChange}
              required
              className="w-full p-3 bg-[#29293D] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative mb-4">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={data.lastName}
              onChange={handleChange}
              required
              className="w-full p-3 bg-[#29293D] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={data.email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-[#29293D] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              required
              className="w-full p-3 bg-[#29293D] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && (
            <div className="w-full p-3 mb-4 bg-red-500 text-white text-center rounded-md">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold hover:from-purple-600 hover:to-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
