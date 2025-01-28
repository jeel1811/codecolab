import React from "react";
import CodeEditor from "./codeeditor";

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div className="h-screen bg-[#0F172A] text-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#111827] p-4">
        <nav className="flex justify-between items-center w-full">
          <h1 className="text-xl font-semibold text-white">CodeFusion</h1>
          <button
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-16 bg-[#1E293B] flex flex-col items-center p-3 space-y-6 pt-5">
          <button className="p-2 bg-[#111827] rounded-md hover:bg-gray-700">
            <img src="/path-to-logo1.svg" alt="Logo 1" className="w-8 h-8" />
          </button>
          <button className="p-2 bg-[#111827] rounded-md hover:bg-gray-700">
            <img src="/path-to-logo2.svg" alt="Logo 2" className="w-8 h-8" />
          </button>
          <button className="p-2 bg-[#111827] rounded-md hover:bg-gray-700">
            <img src="/path-to-logo3.svg" alt="Logo 3" className="w-8 h-8" />
          </button>
        </aside>

        {/* Code Editor Section */}
        <div className="flex-1 p-5 bg-[#1E293B] border-l border-gray-700">
          <CodeEditor />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

