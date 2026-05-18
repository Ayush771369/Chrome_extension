// Creates a context menu item and handles right-click interactions.
chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "detect-right-click",
		title: "Right click detected",
		contexts: ["selection", "page"]
	});
});

// Fired when the extension context menu item is clicked after a right-click.
chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "summarizeText") {
		const selectedText = info.selectionText;

        chrome.storage.local.set({selectedText: selectedText});
        console.log("selected text saved");
	}
});
