const Dao = require('../lib/Dao');
const { Notification } = require('electron');

let dao = new Dao();

const addProduct = (table,values) => {
    dao.create(table,values).then(() => {
        new Notification({
            title:'Operación finalizada',
            body:'Producto guardado exitosamente',
            sound: 'default'
        }).show();
    }).catch((err) => {
        new Notification({
            title:'Ha ocurrido un error',
            body:`Codigo de error: ${err.sqlState}`,
            sound: 'default'
        }).show();
        
    });

}

const getProducts = () => {
   return new Promise((resolve,reject) => {
       dao.getAll('product').then((res) => {
           resolve(res);
       }).catch((error) => {
           reject(error);
       });
   });
}


module.exports = {
    addProduct,
    getProducts
}