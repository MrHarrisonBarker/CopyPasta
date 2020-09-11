// A generic onclick callback function.
function OnClick(clicked) {
  console.log("item " + clicked.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(clicked));

  if (clicked.mediaType == "image") {
    sendDiscordMessage(clicked.srcUrl);
  } else {
    if (clicked.linkUrl !== undefined && clicked.linkUrl !== null && clicked.linkUrl !== "") {
      sendDiscordMessage(clicked.linkUrl);
    } else {
      sendDiscordMessage(clicked.srcUrl);
    }
  }
}

function PlayOnClick(clicked) {

  console.log("item " + clicked.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(clicked));

  if (clicked.linkUrl != null) sendDiscordCommand(clicked.linkUrl);

}

function sendDiscordCommand(message) {

  console.log("sending discord command");

  chrome.storage.sync.get(['webhookCommandUrl', 'prefix'], function (data) {

    console.log("storage return", data);

    if (data.webhookCommandUrl !== undefined && data.webhookCommandUrl !== null && data.webhookCommandUrl !== "" && data.prefix !== undefined && data.prefix !== null && data.prefix !== "") {

      var request = new XMLHttpRequest();

      request.open("POST", data.webhookCommandUrl);
      request.setRequestHeader('Content-type', 'application/json');

      var params = {
        username: "CopyPasta",
        avatar_url: "",
        content: (data.prefix + " " + message)
      }

      console.log("Sending discord command", params);

      request.send(JSON.stringify(params));

    } else {
      alert("No Discord command webhook url");
    }
  });
}

function sendDiscordMessage(message) {

  chrome.storage.sync.get('webhookUrl', function (data) {
    if (data.webhookUrl !== undefined && data.webhookUrl !== null && data.webhookUrl !== "") {

      var request = new XMLHttpRequest();

      request.open("POST", data.webhookUrl);
      request.setRequestHeader('Content-type', 'application/json');

      console.log(new URL(message));
      var messageAsUrl = new URL(message);

      if (messageAsUrl.host == "preview.redd.it") 
      {
        console.log("link is a reddit video link");
        message = `https://i.redd.it${messageAsUrl.pathname}`;
      }

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

  chrome.contextMenus.create({
    "title": ("send " + context + " to discord"),
    "contexts": [context],
    "onclick": OnClick
  });

  // if (context == "link" || context == "video" || context == "audio") {
  //   chrome.contextMenus.create({
  //     "title": ("play " + context + " on discord"),
  //     "contexts": [context],
  //     "onclick": PlayOnClick
  //   });
  // }
}

// Intentionally create an invalid item, to show off error checking in the
// create callback.
console.log("About to try creating an invalid item - an error about " +
  "item 999 should show up");


chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({
    webhookUrl: '',
    webhookCommandUrl: '',
    prefix: '!play'
  }, function () {
    console.log("Webhook url loaded");
  });
});