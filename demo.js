const fs = require('fs').promises; // Require the Node.js file system module (using promises)

async function checkPassword(password) {
  try {
    const commonPasswordsText = await fs.readFile('10k-most-common.txt', 'utf-8');
    const commonPasswordsList = commonPasswordsText.split('\n');

    if (commonPasswordsList.includes(password)) {
      console.log('Password is common. Please choose a more secure password.');
      return true;
    } else {
      console.log('Password is not common. It is secure.');
      return false;
    }
  } catch (error) {
    console.error('Error reading the common password list:', error);
    return false;
  }
}

async function main() {
    const isCommon = await checkPassword('monkey');
    console.log(isCommon);
    return isCommon
  }
//const isCommon = checkPassword('monkey');
// console.log(isCommon);

module.exports = {
    checkPassword
  };