// Creates a context menu item and handles right-click interactions.
chrome.runtime.onInstalled.addListener(() => {
	chrome.sidePanel.setPanelBehavior({
		openPanelOnActionClick: true // Open the side panel when the extension icon is clicked
	});
	chrome.contextMenus.create({
		id: "summarizeText",
		title: "Summarize with AI",
		contexts: ["selection"] // Show the context menu item only when text is selected
	});
});

// Fired when the extension context menu item is clicked after a right-click.
chrome.contextMenus.onClicked.addListener((info, tab) => {
	console.log("Context menu item clicked:", info);
	if (info.menuItemId === "summarizeText") {
		const selectedText = info.selectionText; // Get the selected text from the context menu click event
	}
});

// Listen for messages from the popup script to provide the selected text when requested.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "getSelectedText") {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const activeTab = tabs[0];
			chrome.tabs.sendMessage(activeTab.id, { action: "getSelectedText" }, (response) => {
				sendResponse({ text: response ? response.text : null }); // Send the selected text back to the popup
			});
		});
		return true; // Indicate that we will send a response asynchronously
	}
});

//add another message action listener for summarization requests from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.action === "summarizeText") {

    fetch("http://localhost:3000/api/ai", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            text: request.text,
            actionType: request.actionType
        })

    })

    .then(response => response.json())

    .then(data => {

        console.log("Backend Response:", data);

        sendResponse({
            summary: data.result
        });

    })

    .catch(error => {

        console.error("Backend Error:", error);

        sendResponse({
            summary: "Backend error."
        });

    });

    return true;
}

});