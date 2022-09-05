function storage_onChanged(changes, areaName) {
	if (areaName == "local" && changes.image_data_url) {
		set_background_image(changes.image_data_url.newValue, true);
	}
}

function set_background_image(data_url, changed) {
	if (data_url) {
		// https://www.w3schools.com/jsref/prop_style_backgroundimage.asp
		document.body.style.backgroundImage = "url('" + data_url + "')";
	}
	else if (changed) {
		document.body.style.backgroundImage = "initial";
	}
	else {
		console.log("You haven't 'uploaded' an image yet. Please click the extension action.");
	}
}

// Initialization

chrome.storage.local.get("image_data_url")
.then(items => set_background_image(items.image_data_url, false));

chrome.storage.onChanged.addListener(storage_onChanged);
