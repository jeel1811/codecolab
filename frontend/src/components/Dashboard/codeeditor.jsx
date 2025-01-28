import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/material.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const CodeEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState("// Write your code here...");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [roomId, setRoomId] = useState("");  // State for room ID

  useEffect(() => {
    // Check if room ID is already in the URL
    const urlParams = new URLSearchParams(location.search);
    const existingRoomId = urlParams.get("roomId");

    if (!existingRoomId) {
      // Generate a new room ID and append it to the URL
      const newRoomId = uuidv4().substring(0, 8);  // Generate and shorten the room ID
      setRoomId(newRoomId);
      navigate(`?roomId=${newRoomId}`);
    } else {
      setRoomId(existingRoomId);
    }
  }, [location, navigate]);

  const handleRun = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/code/run", {
        code,
        language,
      });

      if (response.data.stdout) {
        setOutput(response.data.stdout);
      } else {
        setOutput(response.data.stderr || "Execution error occurred");
      }
    } catch (error) {
      setOutput("Error running code");
    }
  };

  return (
    
    <div className="h-screen bg-[#0F172A] text-white flex flex-col p-5">
      <div className="flex justify-between mb-3">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="p-2 bg-gray-800 text-white rounded-md mr-2"
          />
          <button
            onClick={() => {
              if (!roomId) {
                alert("Please enter a valid room ID to join.");
              } else {
                navigate(`?roomId=${roomId}`);
              }
            }}
            className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Join Room
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-xl font-bold">Code Editor</h1>
        <div className="justify-between flex items-center">
          <p className="p-2">Language</p>
          <select
            className="p-2 bg-gray-800 text-white rounded-md"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
          </select>
        </div>
      </div>
      
      <CodeMirror
        value={code}
        options={{
          mode: language,
          theme: "material",
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => setCode(value)}
        className="h-[300px]"
      />

      <button
        onClick={handleRun}
        className="mt-4 bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Run Code
      </button>

      <div className="mt-4 p-3 bg-gray-800 rounded-md">
        <h3 className="text-lg font-semibold">Output:</h3>
        <pre className="text-green-400">{output}</pre>
      </div>

      {/* {roomId && (
        <div className="mt-4 text-green-400">
          <p>Room ID: {roomId}</p>
        </div>
      )} */}
    </div>
  );
};

export default CodeEditor;