//const main = require('electron').remote.require('./main') // bar
const { remote } = require('electron');

const homeController = remote.require('./controllers/homeController');
const { parseString } = remote.require('./lib/proccesData');

const form = document.getElementById('product-form');

const inputName = document.getElementById('name');
const inputPrice = document.getElementById('price');
const textArea = document.getElementById('description');



form.addEventListener('submit', (event) => {
    event.preventDefault(); //Cancelar el comportamiento por defecto como lo es recargar la pagina
    let newProduct = [Date.now(), parseString(inputName.value), parseFloat(inputPrice.value), parseString(textArea.value)];
    homeController.addProduct('product',newProduct);

});