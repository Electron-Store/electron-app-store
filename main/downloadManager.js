const { DownloaderHelper } = require("node-downloader-helper");
const downloads = [];

function downloadFile(fileURL) {
	const dl = new DownloaderHelper(
		"http://www.ovh.net/files/1Gio.dat",
		__dirname
	);
	downloads.push(dl);
	dl.on("end", () => console.log("Download Completed"));
	dl.start();
}
