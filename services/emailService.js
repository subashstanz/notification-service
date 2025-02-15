module.exports = async function sendEmail(to, message) {
  console.log(`📧 Sending email to ${to}: ${message}`);
  return Promise.resolve();
};
