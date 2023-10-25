console.log('background running')

chrome.runtime.onMessage.addListener(receiver);

window.pwd="";

function receiver(request, sender, sendResponse){
    console.log(request)
    window.pwd=request.text;

    console.log(window.pwd)
    
}