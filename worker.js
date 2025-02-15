const { Worker } = require("bullmq");
const Redis = require("ioredis");
const sendEmail = require("./services/emailService");
const sendSMS = require("./services/smsService");
const sendPushNotification = require("./services/pushService");

const redisConnection = new Redis({
  host: process.env.REDIS_HOST,
  maxRetriesPerRequest: null, // Add this line
});

const notificationWorker = new Worker(
  "notifications",
  async (job) => {
    const { type, recipient, message } = job.data;
    try {
      if (type === "email") {
        await sendEmail(recipient, message);
      } else if (type === "sms") {
        await sendSMS(recipient, message);
      } else if (type === "push") {
        await sendPushNotification(recipient, message);
      }
      console.log(`✅ Notification sent: ${type} to ${recipient}`);
    } catch (error) {
      console.error(`❌ Error sending ${type} notification:`, error);
      throw error;
    }
  },
  {
    connection: redisConnection,
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
  }
);

console.log("⚡ Notification Worker Started");

// Let me explain these concepts with a real-world analogy: a restaurant kitchen!

// Worker: Imagine the kitchen as the worker. It's the place where all the cooking happens.
// Queue: Think of the queue as the waiting area for orders. When a customer places an order, it goes into the queue.
// Job: A job is an individual order that needs to be prepared.
// Task: A task is the actual cooking process. For example, boiling water is a task.

// Redis is used here as a **message broker**, not primarily as a database. Here's why:

// 1. **Message Passing**: Redis is used to pass messages between different parts of the application.
// 2. **Decoupling**: The sender (producer) and receiver (consumer) are decoupled. The sender doesn't need to know anything about the receiver.
// 3. **Scalability**: Redis can handle a large number of messages efficiently.
// 4. **Reliability**: Redis provides reliable message delivery.

// Redis is used here as a **message broker**, not primarily as a database. Here's why:

// 1. It's fast (in-memory)
// 2. Can persist data if needed
// 3. Supports multiple consumers
// 4. Has built-in pub/sub features
// 5. Can handle thousands of jobs per second
