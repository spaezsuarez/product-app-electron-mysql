const mysql = require("promise-mysql");
const keys = require("../private/keys");

let pool;

const init_db = () => {
    pool = mysql.createPool(keys).then((data) => {
        console.log("Conexion a la base de datos exitosa");
      });
}

const getConnection = () => {
  return pool;
};



module.exports = {
  init_db,
  getConnection
};
