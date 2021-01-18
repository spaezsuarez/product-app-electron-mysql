const { createWindow } = require('./lib/main');
const { init_db } = require('./lib/database');
const { app } = require('electron'); //Objeto que maneja los eventos de la aplicacion

require('electron-reload')(__dirname);

init_db();
app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow);