let currentAction = "summarize";
const actionButtons = document.querySelectorAll(".ai-action-btn");

actionButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentAction = button.dataset.action;

        actionButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        console.log("Current action:", currentAction);

        const selectedText = output.textContent;

        if (
            selectedText &&
            selectedText !==
            "No text selected. Please select some text and try again."
        ) {

            summaryOutput.textContent = "Thinking...";

            chrome.runtime.sendMessage({

                action: "summarizeText",
                text: selectedText,
                actionType: currentAction

            }, (response) => {

                if (response && response.summary) {

                    summaryOutput.textContent =
                    response.summary;

                } else {

                    summaryOutput.textContent =
                    "Failed to generate response.";

                }

            });

        } else {

            summaryOutput.textContent =
            "Please select some text first.";

        }

    });

});

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


