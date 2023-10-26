// Function to search for a string in a file
function searchForStringInFile(file, searchString, callback) {
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const fileContents = event.target.result;
      if (fileContents.includes(searchString)) {
        callback(true); // String found, return true
      } else {
        callback(false); // String not found, return false
      }
    };
  
    reader.onerror = function (event) {
      callback('Error reading the file: ' + event.target.error);
    };
  
    reader.readAsText(file);
  }
  
  // Create a File object representing the text file
  const textFile = new File(['This is some example text.\nAnother line of text.'], 'example.txt', {
    type: 'text/plain'
  });
  
  // Specify the search string as a variable
  const searchString = 'example text';
  
  // Call the search function with the text file and the search string variable
  searchForStringInFile(textFile, searchString, function (result) {
    console.log(result);
  });
  
  
  