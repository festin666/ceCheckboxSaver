function restoreCheckboxes() {
	var allCheckboxes = document.evaluate("//input[starts-with(@type,'checkbox')]", document.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var selectedCheckboxes = localStorage.getItem("selectedCheckboxes").split(",");
	console.log(allCheckboxes);
	console.log("-");
	console.log(selectedCheckboxes);
	console.log("+");
	for(var i=0; i<allCheckboxes.snapshotLength; i++){
		id = allCheckboxes.snapshotItem(i).id;
		chk = document.getElementById(id);
		console.log(chk);
		if (selectedCheckboxes.indexOf(chk.id) > -1) {
			chk.checked = true;
			console.log("true");
		} else {
			chk.checked = false;
			console.log("false");
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