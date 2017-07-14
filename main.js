const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 650, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

var ApiAIid = "<accessTokenAPIAI>";
var avatar = "<applicationIDBotlibre";

const {ipcMain} = require('electron')
ipcMain.on('autentificate', (event, arg) => {
  console.log(avatar);
  event.sender.send('autentificado', avatar)
})


var apiai = require('apiai');
 
var ai = apiai(ApiAIid);




// UNA VEZ EL USUARIO APRETA ENTER DESDE EL RENDER SE HACE LLAMADA API A API.AI
ipcMain.on('enviar', (event, arg) => { 
var request = ai.textRequest(arg, {
    sessionId: '<unique session id>'
});
 
// CADA VEZ QUE EL RENDER TE SOLICITE RESPUESTA, SE DEVUELVE EL RESULTADO DE LA LLAMADA API A API.AI
request.on('response', function(response) {
	  var uteracion = response.result.resolvedQuery;
      var respuesta = response.result.fulfillment.speech;
      var intencion = response.result.metadata.intentName;
      var confidencia = response.result.score * 100;
	  console.log("Mensaje: " + uteracion);
      console.log("Intención: " + intencion);
      console.log("Respuesta: " + respuesta);
      event.sender.send('respondiendo', respuesta)
});
 
request.on('error', function(error) {
    console.log(error);
});
 
request.end();
})