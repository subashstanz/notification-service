module.exports = async function sendSMS(to, message) {
  console.log(`📱 Sending SMS to ${to}: ${message}`);
  return Promise.resolve();
};
