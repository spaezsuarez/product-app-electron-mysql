const { BrowserWindow } = require('electron'); //Clase que me permite mostrar una ventana por pantalla

let window;

const createWindow = () => {
    window = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration:true //Propiedad para indicar que dentro de la ventana puedo importar modulos de node
        },
        resizable:false
    });
    window.loadFile('src/view/index.html');
}

module.exports =  {
    createWindow
};