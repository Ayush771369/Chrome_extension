const output = document.getElementById("output"); // Get the selected text from storage and display it

// ask background script for the selected text when the popup is opened
chrome.runtime.sendMessage({ action: "getSelectedText" }, (response) => {
    if (response && response.text) {
        output.textContent = response.text; // Display the selected text in the popup   
    } else {
        output.textContent = "No text selected. Please select some text and try again.";
    } 
});
