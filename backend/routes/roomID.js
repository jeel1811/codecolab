const express = require("express");
const { v4: uuidv4 } = require("uuid");  // Importing UUID
const router = express.Router();

// Create a new room (UUID generation and shortening)
router.post("/create-room", (req, res) => {
  const roomId = uuidv4().substring(0, 8);  // Generate a new UUID and take the first 8 characters
  res.json({ roomId });  // Return the shortened room ID
});

module.exports = router;
// Join an existing room using UUID
router.get("/join-room/:roomID", async (req, res) => {
  const roomID = req.params.roomID;
  try {
    // Validate roomID, check if it exists
    res.json({ message: `Joined room ${roomID}` });
  } catch (error) {
    res.status(500).json({ error: "Failed to join room" });
  }
});


module.exports = router;