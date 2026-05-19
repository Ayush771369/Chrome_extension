console.log("Content script loaded and ready to receive messages.");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.action === "getSelectedText") {

        const selectedText = window.getSelection().toString();
        console.log("Selected text sent to popup:", selectedText);
        sendResponse({
            text: selectedText
        });
    }
    return true; // Indicate that we will send a response asynchronously

});