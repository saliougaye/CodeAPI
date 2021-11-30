const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {


	var uploadFile = document.getElementById('upload');

	global.filepath = undefined;

	uploadFile.addEventListener('click', () => {
		console.log("Clicked");
		

		ipcRenderer.send('open-file');

		
	});


	ipcRenderer.on('csv-uploaded', (event, message) => {
		console.log(message);

		alert(message);
	})



});
