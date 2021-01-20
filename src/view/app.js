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

let updating = false;

let editProduct = {
    id:0,
    nombre:'',
    precio:0,
    descripcion:''
};
//

const deleteProduct = (id) => {

    if(window.confirm("¿Seguro que desea eliminar el producto?")){
        homeController.deleteItem(id).then(() => {
            initProducts();
        }).catch((err) => {
            homeController.getErrorMesssage(err.sqlState);
        })
    }
}

const updateProduct = (id) => {
    if (window.confirm("¿Seguro que desea modificar los datos?")) {
        updating = true;
        homeController.getProduct(id).then((res) => {
        editProduct.nombre = res[0].nombre;
        editProduct.id = id;
        editProduct.precio = res[0].precio;
        editProduct.descripcion = res[0].descripcion

        inputName.value = res[0].nombre;
        inputPrice.value = res[0].precio;
        textArea.value = res[0].descripcion;
        form.focus();

    }).catch((err) => {
        homeController.getErrorMesssage(err.sqlState);
    })
    }


}

const renderProducts = (products) => {

    productsList.innerHTML = '';
    products.forEach((element) => {//my-2 margen en el eje y de 2
        productsList.innerHTML += `
            <div class="card card-body my-2 animate__animated animate__fadeInLeft">
                <h4>${element.nombre}</h4>
                <p>${element.descripcion}</p>
                <h4>$${element.precio}</h4>
                <p class="row justify-content-center">
                    <button class="btn btn-danger" onClick="deleteProduct(${element.id})">Eliminar</button>
                    <button class="btn btn-info" onClick="updateProduct(${element.id})">Editar</button>
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
        homeController.getErrorMesssage(err.sqlState);
    });
}

form.addEventListener('submit', (event) => {
    event.preventDefault(); //Cancelar el comportamiento por defecto como lo es recargar la pagina
    if(!updating){
        let newProduct = [Date.now(), parseString(inputName.value), parseFloat(inputPrice.value), parseString(textArea.value)];
        homeController.addProduct('product',newProduct);
        inputName.value = '';
        inputPrice.value = '';
        textArea.value = '';
        form.focus();
        initProducts();
    }else{
        editProduct.nombre = parseString(inputName.value);
        editProduct.precio = parseFloat(inputPrice.value);
        editProduct.descripcion = parseString(textArea.value);
        
        homeController.updateItem(editProduct.id,editProduct).then(() => {
            initProducts();
            updating = false;
            inputName.value = '';
            inputPrice.value = '';
            textArea.value = '';
            form.focus();
        }).catch((err) => {
            alert(`Ha ocurrido un error codigo ${err.sqlState} `);
        });
    }
    

});


initProducts();
