# Crud Electron-Mysql

Ejemplo de un crud utlizando electron y msyql

## Autor:
- Sergio David Paez Suarez 

## Estructura de archivos:
```
src
├── controllers
│   └── homeController.js
├── index.js
├── lib
│   ├── Dao.js
│   ├── database.js
│   └── proccesData.js
├── main.js
├── private
│   └── keys.js
└── view
    ├── app.js
    ├── assets
    │   └── icon.png
    ├── bootstrap.min.css
    ├── index.html
    ├── pages
    │   └── about.html
    ├── style.css
    └── styles
        └── about.css
```

**Para que el programa funcine debe tener la carpeta `private` con un archivo llamado `keys.js` con la siguiente estructura:**

```
module.exports = {
    host:'',
    user:'',
    password:'',
    database:''
}
```

## Ejecución en modo Desarrollo:

Una vez clonado el proyecto se debe entrar a la carpeta principal y ejecutar los siguientes comandos:

- `npm install`
- `npm run start:dev`