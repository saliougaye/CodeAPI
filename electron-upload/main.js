const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const upload = require('./upload-snippet');
const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');


require('dotenv').config();

const MONGO_DB = process.env.MONGO_DB;

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        //enableRemoteModule: true,
        nodeIntegration: true
      }
    });
  
    win.loadFile('./src/index.html');
}

mongoose.connect(MONGO_DB).then(
  () => {
    
    app.whenReady().then(() => {
      createWindow();
    });
  
  }
).catch(
  (e) => console.log(e)
);

ipcMain.on('open-file', e => {
  console.log("open file")

  const properties = {
    title: 'Select the File to be uploaded',
    defaultPath: __dirname,
    buttonLabel: 'Upload',
    // Restricting the user to only Text Files.
    filters: [
      {
        name: 'CSV Files',
        extensions: ['csv']
      }, ],
    // Specifying the File Selector Property
    properties: process.platform !== 'darwin' ? ['openFile'] : ['openFile', 'openDirectory']
  }



  dialog.showOpenDialog(properties)
    .then(file => {
      console.log(file.canceled);
      if (!file.canceled) {
        global.filepath = file.filePaths[0].toString();
        console.log(global.filepath);

        
        readCSV(global.filepath, async (data) => {
          console.log(data);

          try {

            for(const snippet of data) {
              
              await upload(snippet);

              console.log("Uploaded Correctly")
            }

            e.sender.send('csv-uploaded', 'Uploaded');
          } catch(e) {

            console.log(e)
            e.sender.send('csv-uploaded', 'Not Uploaded');
          }

          
        })
      }
    })
    .catch(err => {
      console.log(err)
    });
});


const readCSV = (filename, callback) => {
  const results = []
  fs.createReadStream(filename)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      callback(results);
    })
}

