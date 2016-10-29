function onClickSave() {
	chrome.tabs.query({"active": true}, function(result) {
		chrome.tabs.sendMessage(result[0].id, {"action": "readCheckboxes"});
	});	
}
function onClickLoad() {
	chrome.tabs.query({"active": true}, function(result) {
		chrome.tabs.sendMessage(result[0].id, {"action": "restoreCheckboxes"});
	});	
}

document.addEventListener('DOMContentLoaded', function () {
  var btnSave = document.getElementById('saveState');
  var btnLoad = document.getElementById('loadState');
  btnSave.addEventListener('click', onClickSave);
  btnLoad.addEventListener('click', onClickLoad);
});
chrome.runtime.onMessage.addListener(function(message, sender, response) {
	console.log(sender + ": " + message);
});

