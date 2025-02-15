module.exports = async function sendPushNotification(to, message) {
  console.log(`🔔 Sending Push Notification to ${to}: ${message}`);
  return Promise.resolve();
};
