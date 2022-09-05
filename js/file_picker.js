function storage_onChanged(changes, areaName) {
	let settings = {};
	if (areaName == "local") {
		if (changes.image_data_url) {
			settings.image_data_url = changes.image_data_url.newValue ?? "";
		}
		if (changes.image_filename) {
			settings.image_filename = changes.image_filename.newValue ?? "none";
		}
	}
	set_image(settings);
}

function set_image(settings) {
	let image = document.getElementById("image");
	if (settings.image_data_url !== undefined) { image.src = settings.image_data_url; }
	if (settings.image_filename !== undefined) { image.alt = settings.image_filename; }
}

function remove_image() {
	chrome.storage.local.remove(["image_data_url", "image_filename"]);
}

function store_image() {
	if (this.files.length > 0) {
		const reader = new FileReader();
		reader.addEventListener("load", () => {
			chrome.storage.local.set({"image_data_url": reader.result, "image_filename": this.files[0].name});
		});
		reader.readAsDataURL(this.files[0]);
	}
}

// Initialization

chrome.storage.local.get(["image_data_url", "image_filename"])
	.then(items => {
		set_image({image_data_url: items.image_data_url ?? "", image_filename: items.image_filename ?? "none"});
	}
);

document.getElementById("file_picker").addEventListener("change", store_image);
document.getElementById("button_clear").addEventListener("click", remove_image);

chrome.storage.onChanged.addListener(storage_onChanged);
