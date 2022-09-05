async function action_onClicked(tab, onClickData) {
	chrome.tabs.create({
		active: true,
		url: chrome.runtime.getURL("/html/file_picker.html"),
	});
}

chrome.action.onClicked.addListener(action_onClicked);
