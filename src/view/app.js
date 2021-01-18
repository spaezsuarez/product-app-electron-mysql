const form = document.getElementById('product-form');

const inputName = document.getElementById('name');
const inputPrice = document.getElementById('price');
const textArea = document.getElementById('description');


form.addEventListener('submit',(event) => {
    event.preventDefault(); //Cancelar el comportamiento por defecto como lo es recargar la pagina

    const newProduct = {
        name:inputName.value,
        price:inputPrice.value,
        description:textArea.value
    }

    
});