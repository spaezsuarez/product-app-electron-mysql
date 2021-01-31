const { BrowserWindow } = require('electron'); //Clase que me permite mostrar una ventana por pantalla

let window;

const createWindow = () => {
    window = new BrowserWindow({
        width:800,
        height:600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
        icon:'src/view/assets/icon.png',
        resizable:true,
        center:true
    });
    window.loadFile('src/view/index.html');
}

module.exports =  {
    createWindow,
    createProduct
};