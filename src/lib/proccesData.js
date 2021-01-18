const getIdDB = (table) => {
    switch (table) {
        case 'Cliente':
            return 'idCliente';
        case 'Cuenta':
            return 'idCuenta';
        case 'Operacion':
            return 'idOperacion';
        case 'TarjetaDebito':
            return 'idTarjeta';
        default:
            return 'id';
    }
}

const getValueText = (list) => {
    let values = 'VALUES(';
    for (let i = 0; i < list.length; i++) {
        if (i === (list.length - 1)) {
            values += `${list[i]});`
        } else {
            values += `${list[i]},`
        }
    }

    return values;
}

const getUpdateText = (body) => {
    let update = '';
    for (let clave in body) {
        if (body.hasOwnProperty(clave)) {
            update += `${clave} = ${body[clave]},`;
        }
    }
    return update.substring(0, update.length - 1);

}

const parseString = (text) => {
    return `'${text}'`;
}

module.exports = {
    getIdDB,
    getValueText,
    getUpdateText,
    parseString
}