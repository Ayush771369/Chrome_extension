const output = document.getElementById("output"); // Get the selected text from storage and display it

// ask background script for the selected text when the popup is opened
chrome.runtime.sendMessage({ action: "getSelectedText" }, (response) => {
    if (response && response.text) {
        output.textContent = response.text; // Display the selected text in the popup   
    } else {
        output.textContent = "No text selected. Please select some text and try again.";
    } 
});

const summaryOutput = document.getElementById("summaryOutput"); // Element to display the summary result


const summarizeButton = document.getElementById("summarizeButton");
summarizeButton.addEventListener("click", () => {
    const selectedText = output.textContent;
    if (selectedText && selectedText !== "No text selected. Please select some text and try again.") {
        // Here you would call your AI summarization function with the selectedText
        summaryOutput.textContent = "Summarizing..."; // Show a loading message while summarization is in progress
        chrome.runtime.sendMessage({ action: "summarizeText", text: selectedText }, (response) => {
            if (response && response.summary) {
                summaryOutput.textContent = response.summary; // Display the summary in the popup
            } else {
                summaryOutput.textContent = "Failed to summarize the text. Please try again.";
            }
            });
} else {
    summaryOutput.textContent = "Please select some text to summarize.";
}
});