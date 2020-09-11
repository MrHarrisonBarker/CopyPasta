console.log("Loaded popup.js");
let submit = document.getElementById('submit');
// let commandSubmit = document.getElementById('commandSubmit');
// let prefixSubmit = document.getElementById('prefixSubmit');

let webhookInput = document.getElementById('webhookInput');
let webhookClear = document.getElementById('webhookClear');
// let webhookCommandInput = document.getElementById('webhookCommandInput');
// let prefixInput = document.getElementById('prefixInput');

chrome.storage.sync.get('webhookUrl', function (data) {
    webhookInput.value = data.webhookUrl;
    document.getElementById('prev').innerText = data.webhookUrl;
});

// chrome.storage.sync.get('webhookCommandUrl', function (data) {
//     webhookCommandInput.value = data.webhookCommandUrl;
//     document.getElementById('commandPrev').innerText = data.webhookCommandUrl;
// });

// chrome.storage.sync.get('prefix', function (data) {
//     prefixInput.value = data.prefix;
//     document.getElementById('prefixPrev').innerText = data.prefix;
// });

function setWebhook() {
    document.getElementById('prev').innerText = webhookInput.value;

    var webhookRegex = /discordapp.com\/api\/webhooks\/([^\/]+)\/([^\/]+)/
    if (!webhookRegex.test(webhookInput.value)) 
    {
        alert("That is not a discord webhook url");
        document.getElementById('prev').innerText = null;   
    } else {
        chrome.storage.sync.set({
            webhookUrl: webhookInput.value
        }, function () {
            console.log("The url is", webhookInput.value);
        });
    }
    // console.log("set webhook", webhookInput.value);
}

function clearWebhook() {
    chrome.storage.sync.set({
        webhookUrl: null
    });
    document.getElementById('prev').innerText = null;   
}

// function setCommandWebhook() {
//     document.getElementById('commandPrev').innerText = webhookCommandInput.value;

//     chrome.storage.sync.set({
//         webhookCommandUrl: webhookCommandInput.value
//     }, function () {
//         console.log("The url is", webhookCommandInput.value);
//     });

//     console.log("set command webhook", webhookCommandInput.value);
// }

// function setPrefix() {
//     document.getElementById('prefixPrev').innerText = prefixInput.value;

//     chrome.storage.sync.set({
//         prefix: prefixInput.value
//     }, function () {
//         console.log("The url is", prefixInput.value);
//     });

//     console.log("set prefix", prefixInput.value);
// }

submit.addEventListener('click', setWebhook);
webhookClear.addEventListener('click', clearWebhook);
// commandSubmit.addEventListener('click', setCommandWebhook);
// prefixSubmit.addEventListener('click', setPrefix);
