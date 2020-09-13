console.log("Loaded popup.js");
let submit = document.getElementById('submit');
let userIdSubmit = document.getElementById('userIdInputSubmit');
let helpButton = document.getElementById('helpToggle');

let webhookInput = document.getElementById('webhookInput');
let webhookClear = document.getElementById('webhookClear');
let userIdInput = document.getElementById('userIdInput');
let userIdClear = document.getElementById('userIdClear');

let userIdRegex = /[0-9]{1,64}/;
let webhookRegex = /discordapp.com\/api\/webhooks\/([^\/]+)\/([^\/]+)/;

chrome.storage.sync.get('webhookUrl', function (data) {
    webhookInput.value = data.webhookUrl;
    document.getElementById('prev').innerText = data.webhookUrl;
});

chrome.storage.sync.get('userId', function (data) {
    userIdInput.value = data.userId;
    document.getElementById('userIdPreview').innerText = data.userId;
});


function setWebhook() {

    let webhookUrl = webhookInput.value;

    console.log("setting webhook", webhookUrl);

    document.getElementById('prev').innerText = webhookUrl;

    if (!webhookRegex.test(webhookUrl)) 
    {
        alert("That is not a discord webhook url");
        document.getElementById('prev').innerText = null;   
    } else {
        chrome.storage.sync.set({
            webhookUrl: webhookUrl
        }, function () {
            console.log("The url is", webhookUrl);
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

function setUserId() {

    let userId = userIdInput.value;

    console.log("setting userId", userId);

    document.getElementById('userIdPreview').innerText = userId;

    chrome.storage.sync.set({
        userId: userId
    });
}

function clearUserId() {
    chrome.storage.sync.set({
        userId: null
    });

    document.getElementById('userIdPreview').innerText = null;
}

function toggleHelp() {
    let help = document.getElementById('help');
    console.log(help.style.display);
    if (help.style.display === "none" || help.style.display == "") {
      help.style.display = "block";
    } else {
      help.style.display = "none";
    }
  }


submit.addEventListener('click', setWebhook);
webhookClear.addEventListener('click', clearWebhook);

userIdSubmit.addEventListener('click', setUserId);
userIdClear.addEventListener('click',clearUserId);

helpButton.addEventListener('click', toggleHelp);
