
function check(password) {

    const fs = require('fs');

    let word = password
    // Read the contents of a text file
    const text = fs.readFileSync('10k-most-common.txt', 'utf-8');

    const regex = new RegExp(word);

    const matches = text.match(regex);

    if (matches) {
        console.log('Pattern found:', matches[0]);
        return true
    } else {
        console.log('Pattern not found.');
        return false
    }

}

console.log(check('1234'));



// module.exports = {
//     check
//   };