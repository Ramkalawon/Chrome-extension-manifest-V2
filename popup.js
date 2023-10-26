
//const check = require('./demo2.js');

console.log ("Hello from popup.js")


let fileContent;

fetch('10k-most-common.txt')
  .then(response => response.text())
  .then(data => {
    fileContent = data;
   //console.log(fileContent);
  })
  .catch(error => console.error('Error reading the file:', error));


let bgpage= chrome.extension.getBackgroundPage();
let password = bgpage.pwd;

// Function to search for a string in a file
function searchForStringInFile(file, searchString) {
  const reader = new FileReader();

  console.log (searchString)
  console.log ("mo ladannnnn")
  reader.onload = function (event) {
    const fileContents = event.target.result;
    if (fileContents.includes(searchString)) {
      console.log("true")
      return true; // String found, return true
    } else {
      console.log("false")
      return false; // String not found, return false
    }
  };

  reader.onerror = function (event) {
    callback('Error reading the file: ' + event.target.error);
  };

  reader.readAsText(file);
}




// Create a File object representing the text file
const textFile = new File([fileContent], 'example.txt', {
  type: 'text/plain'
});
  


// Function to validate password against a set of requirements
function validatePassword(password) {
  const requirements = [
    {
      label: 'At least 8 characters',
      isValid: password.length >= 8 // Check if password length is greater than or equal to 8
     },
    {
      label: 'At least 1 number',
      isValid: /\d/.test(password) // Check if password contains at least one digit
    },
    {
      label: 'At least 1 lowercase letter',
      isValid: /[a-z]/.test(password) // Check if password contains at least one lowercase letter
    },
    {
      label: 'At least 1 uppercase letter',
      isValid: /[A-Z]/.test(password) // Check if password contains at least one uppercase letter
    },
    {
      label: 'At least 1 special symbol',
      isValid: /[!@#$%^&*`~()'"<>?/{}|]/.test(password) // Check if password contains at least one special symbol
    },

    {
      label: 'No presence of common word',
      isValid: searchForStringInFile(textFile, "ashiv")
    },
      console.log(searchForStringInFile(textFile, "batman"))

  ];

  // Check if all the password requirements are fulfilled
  const isPasswordValid = requirements.every(requirement => requirement.isValid);

  // Return the validation result along with the detailed requirements status
  return {
    isValid: isPasswordValid, // Overall validation result
    requirements: requirements // Detailed requirements status
  };
}

// Function to update the visual status of password requirements
function updateRequirementsStatus(requirements) {
  // Get all elements with class "requirement" which hold the requirement information
  const requirementElements = document.querySelectorAll('.requirement');

  // Loop through each requirement element and update its display based on the requirement's validity
  requirementElements.forEach((requirementElement, index) => {
    // Get the tick element for indicating requirement fulfillment
    const requirementTick = requirementElement.querySelector('.requirementTick');
    // Get the text element displaying the requirement
    const requirementText = requirementElement.querySelector('.requirementText');
    // Get the specific requirement object for this index
    const requirement = requirements[index];

    // Set the inner HTML of the tick element based on the validity of the requirement
    requirementTick.innerHTML = requirement.isValid ? '&#10003;' : ''; // Checkmark or empty
    // Set the color of the requirement text based on validity
    requirementText.style.color = requirement.isValid ? '#00ff00' : '#ff0000'; // Green or red
  });
}

// Get the container element that holds the password checker interface
let container = document.querySelector('.container'); 
  

// Add an event listener to listen for keyup events on the document

document.addEventListener("keyup", function(e) {
  try {


    console.log ("Hello from try ")

    
    let password = document.querySelector('#myPassword').value;
    let passwordError = document.getElementById('passwordError');
    console.log (password)
    let defaultSearchString = password
    let passwordValidation = validatePassword(password);
    
  
    if (!passwordValidation.isValid) {
      passwordError.textContent = 'Password Requirements:';
      container.classList.remove('weak', 'medium', 'strong');
    } else {
      passwordError.textContent = '';
    
    }
    updateRequirementsStatus(passwordValidation.requirements);

    // Calculate the strength of the password based on fulfilled requirements
    let strength = passwordValidation.requirements.filter(requirement => requirement.isValid).length * 20;

    // Get the progress bar element
    let progressBar = document.querySelector('.progress');
    // Set the width of the progress bar based on the calculated strength
    progressBar.style.width = `${strength}%`;

    // Get the strength text element
    let strengthText = document.querySelector('.strengthText');
    // Update the container's and progress bar's classes and the displayed strength text
    if (strength <= 33) {
      container.classList.remove('medium', 'strong');
      container.classList.add('weak');
      progressBar.classList.remove('medium', 'strong');
      progressBar.classList.add('weak');
      strengthText.textContent = 'Weak';
    } else if (strength > 33 && strength <= 66) {
      container.classList.remove('weak', 'strong');
      container.classList.add('medium');
      progressBar.classList.remove('weak', 'strong');
      progressBar.classList.add('medium');
      strengthText.textContent = 'Medium';
    } else {
      container.classList.remove('weak', 'medium');
      container.classList.add('strong');
      progressBar.classList.remove('weak', 'medium');
      progressBar.classList.add('strong');
      strengthText.textContent = 'Strong';
    }
      } catch (error) {
        // Handle the error gracefully, e.g., log it or display a message
        console.error('An error occurred:', error.message);
      }
});

 
    var inputField = document.getElementById("myPassword");
    inputField.value = password;

    // Get the element for displaying password error messages
    let passwordError = document.getElementById('passwordError');

    // Validate the entered password using the validatePassword function
    let passwordValidation = validatePassword(password);

    // If the password doesn't meet the requirements
    if (!passwordValidation.isValid) {
      // Display the error message and remove any strength classes from the container
      passwordError.textContent = 'Password Requirements:';
      container.classList.remove('weak', 'medium', 'strong');
    } else {
      // If the password is valid, clear the error message
      passwordError.textContent = '';
    }

    // Update the visual display of the password requirements' status
    updateRequirementsStatus(passwordValidation.requirements);

  // Calculate the strength of the password based on fulfilled requirements
let strength = passwordValidation.requirements.filter(requirement => requirement.isValid).length * 20;

// Get the progress bar element
let progressBar = document.querySelector('.progress');
// Set the width of the progress bar based on the calculated strength
progressBar.style.width = `${strength}%`;

// Get the strength text element
let strengthText = document.querySelector('.strengthText');

// Update the container's and progress bar's classes and the displayed strength text
if (strength <= 33) {
  container.classList.remove('medium', 'strong');
  container.classList.add('weak');
  progressBar.classList.remove('medium', 'strong');
  progressBar.classList.add('weak');
  strengthText.textContent = 'Weak';
} else if (strength > 33 && strength <= 66) {
  container.classList.remove('weak', 'strong');
  container.classList.add('medium');
  progressBar.classList.remove('weak', 'strong');
  progressBar.classList.add('medium');
  strengthText.textContent = 'Medium';
} else {
  container.classList.remove('weak', 'medium');
  container.classList.add('strong');
  progressBar.classList.remove('weak', 'medium');
  progressBar.classList.add('strong');
  strengthText.textContent = 'Strong';
}

// Select the input field with the ID "myPassword"
let pswrd = document.querySelector('#myPassword');

// Select the button with the ID "showButton"
let showButton = document.querySelector('#showButton');

// Add a click event listener to the "showButton"
showButton.addEventListener('click', function() {
  // Check if the input field's type is currently set to "password"
  if (pswrd.type === 'password') {
    // If the input field's type is "password", change it to "text"
    pswrd.setAttribute('type', 'text');
    // Change the button's text content to "Hide"
    showButton.textContent = 'Hide';
  } else {
    // If the input field's type is not "password", change it back to "password"
    pswrd.setAttribute('type', 'password');
    // Change the button's text content to "Show"
    showButton.textContent = 'Show';
  }
});












