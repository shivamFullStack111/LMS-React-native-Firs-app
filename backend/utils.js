

function generateOTP() {
  // Generate a random number between 0 and 9999
  let otp = Math.floor(1000 + Math.random() * 9000);
  return otp.toString();  // Convert the number to a string
}

exports.generateOTP = generateOTP;