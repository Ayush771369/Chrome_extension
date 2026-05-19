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

        const apiKey = "AIzaSyClt-eWvV7AbD2-5_N--uGE0_ps7nfIcsk";

        const apiUrl =`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

		let prompt = "";

		if (request.actionType === "summarize") {

			prompt =
			`Summarize this text clearly and concisely:\n\n${request.text}`;

		}

		if (request.actionType === "explain") {

			prompt =
			`Explain this text in very simple beginner-friendly words:\n\n${request.text}`;

		}

		if (request.actionType === "notes") {

			prompt =
			`Convert this text into clean and organized study notes:\n\n${request.text}`;

		}

		if (request.actionType === "keypoints") {

			prompt =
			`Extract the key takeaways from this text as bullet points:\n\n${request.text}`;

		}

        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        };

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(data => {

            console.log(JSON.stringify(data, null, 2));

           if (data.candidates && data.candidates.length > 0) {

    const summary =
        data.candidates[0].content.parts[0].text;

    sendResponse({
        summary: summary
    });

} else {

    console.error("Unexpected Gemini response:", data);

    sendResponse({
        summary: "No summary returned from Gemini."
    });

}

		})
        .catch(error => {

            console.error("Gemini API Error:", error);

            sendResponse({
                summary: "Failed to generate summary."
            });

        });

        return true;
    }

});