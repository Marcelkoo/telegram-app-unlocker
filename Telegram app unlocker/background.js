const RULE_ID = 1;

chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
            {
                id: RULE_ID,
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    responseHeaders: [
                        { header: "content-security-policy", operation: "remove" },
                        { header: "x-frame-options", operation: "remove" }
                    ]
                },
                condition: {
                    urlFilter: "*://*/*",
                    resourceTypes: ["main_frame", "sub_frame"]
                }
            }
        ],
        removeRuleIds: []
    })
    .then(() => {
        console.log('Dynamic rules updated successfully.');
    })
    .catch((error) => {
    });
});

chrome.action.onClicked.addListener(() => {
    alert("dev: t.me/marcelkow subscribe for more");
});
