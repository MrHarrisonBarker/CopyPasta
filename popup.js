console.log("Loaded popup.js");
let submit = document.getElementById('submit')
let webhookInput = document.getElementById('webhookInput');

chrome.storage.sync.get('webhookUrl', function (data) {
    webhookInput.value = data.webhookUrl;
    document.getElementById('prev').innerText = data.webhookUrl;
});

// $(document).ready(function() {
//     $('#webhookInput').click(function(handle) {
//         console.log(handle);
//     });
// }


// changeColor.onclick = function (element) {

//     console.log("webhook value",webhookInput.value);

//     let color = element.target.value;
//     chrome.tabs.query({
//         active: true,
//         currentWindow: true
//     }, function (tabs) {
//         chrome.tabs.executeScript(
//             tabs[0].id, {
//                 code: 'document.body.style.backgroundColor = "' + color + '";'
//             });
//     });
// };

function handler() {
    document.getElementById('prev').innerText = webhookInput.value;

    chrome.storage.sync.set({
        webhookUrl: webhookInput.value
    }, function () {
        console.log("The url is", webhookInput.value);
    });
}

submit.addEventListener('click', handler);
