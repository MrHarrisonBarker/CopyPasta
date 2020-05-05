// A generic onclick callback function.
function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));

  if (info.mediaType == "image") {
    sendDiscordMessage(info.srcUrl);
  } else {
    if (info.linkUrl !== undefined && info.linkUrl !== null && info.linkUrl !== "") {
      sendDiscordMessage(info.linkUrl);
    } else {
      sendDiscordMessage(info.srcUrl);
    }
  }
}

function sendDiscordMessage(message) {
  var request = new XMLHttpRequest();
  chrome.storage.sync.get('webhookUrl', function (data) {
    if (data.webhookUrl !== undefined && data.webhookUrl !== null && data.webhookUrl !== "") {
      request.open("POST", data.webhookUrl);
      request.setRequestHeader('Content-type', 'application/json');

      var params = {
        username: "CopyPasta",
        avatar_url: "",
        content: message
      }

      console.log("Sending discord message", params);

      request.send(JSON.stringify(params));

    } else {
      alert("No Discord webhook url");
    }
  });
}

// Create one test item for each context type.
var contexts = ["selection", "link", "editable", "image", "video",
  "audio"
];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "send " + context + " to discord";
  var id = chrome.contextMenus.create({
    "title": title,
    "contexts": [context],
    "onclick": genericOnClick
  });
  console.log("'" + context + "' item:" + id);
}

// Intentionally create an invalid item, to show off error checking in the
// create callback.
console.log("About to try creating an invalid item - an error about " +
  "item 999 should show up");


chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({
    webhookUrl: ''
  }, function () {
    console.log("Webhook url loaded");
  });

  // chrome.contextMenus.create({
  //   "title": "Oops",
  //   "parentId": 999
  // }, function () {
  //   if (chrome.extension.lastError) {
  //     console.log("Got expected error: " + chrome.extension.lastError.message);
  //   }
  // });
});