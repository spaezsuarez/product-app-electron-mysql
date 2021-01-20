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

const getProduct = (id) => {
    return new Promise((resolve,reject) => {
        dao.get('product',id).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
}

const deleteItem = (id) => {
    return new Promise((resolve,reject) => {
        dao.delete('product',id).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
}

const updateItem = (id,body) => {
    return new Promise((resolve,reject) => {
        dao.update('product',body,id).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
}


module.exports = {
    addProduct,
    getProducts,
    getProduct,
    deleteItem,
    updateItem
}