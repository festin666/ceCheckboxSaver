function restoreCheckboxes() {
	var selectedCheckboxes = localStorage.getItem("selectedCheckboxes").split(",");
	for(var i=0; i<selectedCheckboxes.length; i++){
		id = selectedCheckboxes[i];
		chk = document.getElementById(id);
		if (chk) {
			chk.checked = true;
		}
	}
}
function readCheckboxes(){
	var result = document.evaluate("//input[starts-with(@type,'checkbox')]", document.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var selectedCheckboxes = [];
	for (var i = 0; i < result.snapshotLength; i++) {
		id = result.snapshotItem(i).id;
		sel = result.snapshotItem(i).checked;
		if (sel) {
			selectedCheckboxes.push(id);
		}
	}
	saveSelected(selectedCheckboxes);
}
function saveSelected(selectedCheckboxes) {
	storage = localStorage;
	storage.setItem("selectedCheckboxes", selectedCheckboxes);
}

chrome.runtime.onMessage.addListener(function(message, sender, response) {
	if (message.action == 'readCheckboxes') {
		readCheckboxes();
		console.log("Read.")
	} else if (message.action == 'restoreCheckboxes') {
		restoreCheckboxes();
		console.log("Restored.")
	}
	
});