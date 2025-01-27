const express = require("express");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");  // Importing UUID
const router = express.Router();

// Judge0 API Base URL and Key
const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions";
const JUDGE0_API_KEY = "4d9cac7d77msh3f6fef9ac5f99ffp1d54d6jsnd4c656309357"; // Replace with your Judge0 API key

// Room storage (For simplicity, storing in memory, consider a database for persistence)
const rooms = {};

// Execute code endpoint
router.post("/run", async (req, res) => {
  const { code, language } = req.body;

  // Mapping languages to Judge0 language IDs
  const languageMap = {
    javascript: 63, // Node.js
    python: 71,     // Python 3
    c: 50,          // C (GCC)
    cpp: 54,        // C++
  };

  if (!languageMap[language]) {
    return res.status(400).json({ error: "Unsupported programming language" });
  }

  try {
    // Sending code to Judge0 API
    const { data } = await axios.post(
      `${JUDGE0_API_URL}?base64_encoded=false&wait=true`,
      {
        source_code: code,
        language_id: languageMap[language],
        stdin: "", // Add input if needed
      },
      {
        headers: {
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key": JUDGE0_API_KEY,
        },
      }
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Execution failed", details: error.message });
  }
});

// Create a new room (UUID generation and extracting the first part)
router.post("/create-room", (req, res) => {
  const roomId = uuidv4();  // Generate a new UUID
  const shortRoomId = roomId.split("-")[0];  // Take only the first part of the UUID (before the first hyphen)
  rooms[shortRoomId] = { users: [] };  // Initialize an empty room with a users array
  res.json({ roomId: shortRoomId });  // Return the shortened room ID
});

// Get room info (optional)
router.get("/room/:roomId", (req, res) => {
  const { roomId } = req.params;
  const room = rooms[roomId];
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  res.json(room);
});

module.exports = router;
