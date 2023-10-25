console.log("Hello Ashiv! from pwd strength checker.")

window.addEventListener('mouseup',wordSelected);


var currentInput = "";

// Add a keydown event listener to the window
window.addEventListener('keydown', function(event) {
    // Get the key code of the pressed key
    var keyCode = event.keyCode || event.which;

    // Check if the pressed key is a space (key code 32) or Enter (key code 13)
    if (keyCode === 32 || keyCode === 13) {
      // Split the current input into words using whitespace as the delimiter
      var words = currentInput.split(/\s+/);

      // Display the extracted words in the output div
      console.log( "Words: " + words.join(', '));

      // Clear the current input
      currentInput = "";
    } else {
      // Append the pressed key to the current input
      currentInput += event.key;
    }
  });




function wordSelected(){
    console.log('word selected');
    let selectedText = window.getSelection().toString();
    console.log(selectedText)
    
    let message ={
        text: selectedText,
    }
    chrome.runtime.sendMessage(message);
}