import crypto from 'react-native-quick-crypto';

const getRandomInt = (min: number, max: number) => {
  const randomBuffer = crypto.randomBytes(4); // 4 bytes to generate a 32-bit integer
  const randomInt = randomBuffer.byteLength; // Convert bytes to an unsigned 32-bit integer
  return min + (randomInt % (max - min + 1));
};

const randomNumber = (maxNumber: number) => {
  let randomNumberString;
  switch (maxNumber) {
    case 1:
      randomNumberString = Math.floor(getRandomInt(1, 9)).toString();
      break;
    case 2:
      randomNumberString = Math.floor(getRandomInt(10, 90)).toString();
      break;
    case 3:
      randomNumberString = Math.floor(getRandomInt(100, 900)).toString();
      break;
    case 4:
      randomNumberString = Math.floor(getRandomInt(1000, 9000)).toString();
      break;
    case 5:
      randomNumberString = Math.floor(getRandomInt(10000, 90000)).toString();
      break;
    case 6:
      randomNumberString = Math.floor(getRandomInt(100000, 900000)).toString();
      break;
    default:
      randomNumberString = '';
      break;
  }
  return randomNumberString;
};

function generateFromEmail(email: string, randomDigits: number) {
  // Retrieve name from email address
  const nameParts = email.replace(/@.+/, '');
  // Replace all special characters like "@ . _ ";
  const name = nameParts.replace(/[&/\\#,+()$~%._@'":*?<>{}]/g, '');
  // Create and return unique username
  return name + randomNumber(randomDigits);
}

export default generateFromEmail;
