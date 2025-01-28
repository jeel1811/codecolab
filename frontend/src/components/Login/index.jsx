import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/editor";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-200 to-purple-400">
      <div className="bg-[#1a1a2e] text-white rounded-lg shadow-lg w-[400px] p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <p className="text-center text-gray-400 mb-6">Login to your account!</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email id"
              value={data.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#2d2d44] text-white rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#2d2d44] text-white rounded-lg focus:outline-none"
            />
          </div>
          {error && (
            <div className="bg-red-600 text-white text-sm p-2 rounded-md text-center">
              {error}
            </div>
          )}
          <div className="flex justify-between items-center">
            <Link to="/forgot-password" className="text-sm text-blue-400 hover:underline">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg font-bold text-white hover:from-purple-700 hover:to-purple-600 transition-all"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
