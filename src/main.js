const { BrowserWindow } = require('electron'); //Clase que me permite mostrar una ventana por pantalla

let window;

const createProduct = (product) => {
    console.log(product);
}

const createWindow = () => {
    window = new BrowserWindow({
        width:800,
        height:600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
    });
    window.loadFile('src/view/index.html');
}

module.exports =  {
    createWindow,
    createProduct
};