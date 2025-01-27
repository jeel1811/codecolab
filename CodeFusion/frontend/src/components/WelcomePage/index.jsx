import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full mr-2"></div>
          <span className="text-xl font-bold text-gray-800">CodeFusion</span>
        </div>
       
		<Link to="/login">
			<button className="flex items-center text-gray-800 text-sm font-medium border px-4 py-2 rounded-full hover:bg-gray-100 transition">
			Login →
			</button>
          </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center">
        {/* Robot Image */}
        <div className="mb-6">
          <img
            src="https://via.placeholder.com/120"
            alt="Robot"
            className="w-28 h-28 mx-auto"
          />
        </div>
        {/* Text */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Hey Developer! 👋
        </h1>
        <p className="text-xl sm:text-2xl font-bold mb-4">Welcome to our app</p>
       
        {/* Button */}
		 
          <Link to="/signup">
		  <button className="mt-10 bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-full hover:bg-blue-700 transition">
          Get Started
       	  </button>
          </Link>
      </main>
    </div>
  );
};

export default WelcomePage;
