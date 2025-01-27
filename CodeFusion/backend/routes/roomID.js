const { v4: uuidv4 } = require("uuid");

// Create a new room
router.post("/create-room", async (req, res) => {
  try {
    const roomID = uuidv4(); // Generates a unique room ID (UUID)
    // Save the roomID to your database or cache if necessary

    res.json({ roomID });
  } catch (error) {
    res.status(500).json({ error: "Failed to create room" });
  }
});

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
