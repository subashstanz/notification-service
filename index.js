const express = require("express");
const { Queue } = require("bullmq");
const Redis = require("ioredis");
require("dotenv").config();

const app = express();
app.use(express.json());

// Connect to Redis queue
const redisConnection = new Redis({ host: process.env.REDIS_HOST });
const notificationQueue = new Queue("notifications", {
  connection: redisConnection,
});

app.post("/send-notification", async (req, res) => {
  const { type, recipient, message } = req.body;
  console.log("type, recipient, message", { type, recipient, message });
  if (!type || !recipient || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  await notificationQueue.add("send", { type, recipient, message });
  res.json({ success: true, message: "Notification queued successfully!" });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
