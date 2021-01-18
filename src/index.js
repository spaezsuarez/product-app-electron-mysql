const { createWindow } = require('./main');
const { app } = require('electron'); //Objeto que maneja los eventos de la aplicacion

require('electron-reload')(__dirname);

app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow);