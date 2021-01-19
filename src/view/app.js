//Import modulos y funciones de node
const { remote,Notification } = require('electron');
const homeController = remote.require('./controllers/homeController');
const { parseString } = remote.require('./lib/proccesData');

//Elementos html

const form = document.getElementById('product-form');
const inputName = document.getElementById('name');
const inputPrice = document.getElementById('price');
const textArea = document.getElementById('description');
const productsList = document.getElementById('products');

const deleteProduct = (id) => {
    homeController.deleteItem(id).then(() => {
        initProducts();
    }).catch((err) => {
        new Notification({
            title:'Ha ocurrido un error',
            body:`Codigo de error: ${err.sqlState}`,
            sound: 'default'
        }).show();
    })
}

const updateProduct = (data) => {
    console.table(data);
    inputName.value = data.nombre;
    inputPrice.value = data.precio;
    textArea.value = data.descripcion;
    form.focus();
}

const renderProducts = (products) => {

    productsList.innerHTML = '';
    products.forEach(element => {//my-2 margen en el eje y de 2
        productsList.innerHTML += `
            <div class="card card-body my-2 animate__animated animate__fadeInLeft">
                <h4>${element.nombre}</h4>
                <p>${element.descripcion}</p>
                <h4>$${element.precio}</h4>
                <p class="row justify-content-center">
                    <button class="btn btn-danger" onClick="deleteProduct(${element.id})">Eliminar</button>
                    <button class="btn btn-info" onClick="updateProduct(${element})">Editar</button>
                </p>
            </div>
        `;
        
    });
}

const initProducts = () => {
    homeController.getProducts().then((res) => {
        if(res.length === 0){
            productsList.innerHTML = '';
            productsList.innerHTML += `<div class="card card-body my-2 animate__animated animate__fadeInLeft">
            <h4>Opps</h4>
            <p>Parece que aun no hay productos guardados</p>
        </div>`;

        }else{
            renderProducts(res);
        }
    }).catch((err) => {
        new Notification({
            title:'Ha ocurrido un error',
            body:`Codigo de error: ${err.sqlState}`,
            sound: 'default'
        }).show();

    });
}

form.addEventListener('submit', (event) => {
    event.preventDefault(); //Cancelar el comportamiento por defecto como lo es recargar la pagina
    
    let newProduct = [Date.now(), parseString(inputName.value), parseFloat(inputPrice.value), parseString(textArea.value)];
    homeController.addProduct('product',newProduct);
    inputName.value = '';
    inputPrice.value = '';
    textArea.value = '';
    form.focus();
    initProducts();

});


initProducts();
