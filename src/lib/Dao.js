const db = require('./database');
const resource = require('./proccesData');

class Dao{

    sendRequest(request){
        return new Promise((resolve,reject) => {
            db.query(request)
                .then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
        });
    }

    getAll(table){
        return this.sendRequest(`SELECT * FROM ${table};`);
    }

    get(table,id){
        return this.sendRequest(`SELECT * FROM ${table} WHERE ${resource.getIdDB(table)} = ${id};`);
    }

    create(table,data){
        return this.sendRequest(`INSERT INTO ${table} ${resource.getValueText(data)}`);
    }

    delete(table,id){
       return this.sendRequest(`DELETE FROM ${table} WHERE ${resource.getIdDB(table)} = ${id};`);
    }

    update(table,body,id){
        return this.sendRequest(`UPDATE ${table} SET ${resource.getUpdateText(body)} WHERE ${resource.getIdDB(table)} = ${id};`);
    }

    
}

module.exports = Dao;