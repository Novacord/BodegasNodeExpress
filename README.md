# Prueba Desarrollo BackEnd y SQL

Este proyecto consiste en un ejercicio de desarrollo de backend utilizando Node.js y SQL (MySQL). A continuación, se detallan los pasos necesarios para configurar y utilizar el proyecto.

## Configuración del Proyecto

1. Instala las dependencias necesarias:

   ```
   npm install
   ```

2. Crea un archivo `.env` en la raíz del proyecto y configura las siguientes variables de entorno 

```makefile
CREDENCIALES = {"host": "", "user": "", "password": "", "database": "" , "port":}
MY_CONFIG = {"host": "", "port": }
```

3. Importa los datos de prueba ejecutando el archivo `data.sql` en tu base de datos MySQL.

## Routers y Endpoints

A continuación, se detallan los routers y endpoints disponibles en el proyecto:

### Ruta: `/bodegas`

- `GET /bodegas`: Devuelve la lista de todas las bodegas ordenadas alfabéticamente.

- `POST /bodegas`: Crea una nueva bodega. Los datos de entrada deben incluirse en el cuerpo de la solicitud en formato JSON. Ejemplo de datos de entrada:

  ```
  json
  ```

- ```
  { 
    "id": 1
    "nombre": "Bodega 1",
    "id_responsable": "Dirección de la bodega 1",
    "estado": 1,
    "created_by": 14
  }
  ```

### Ruta: `/productos`

- `GET /productos`: Devuelve la lista de todos los productos en orden descendente por el campo "Total". El campo "Total" se calcula como la suma de las unidades disponibles en todas las bodegas.

- `POST /productos`: Crea un nuevo producto y asigna una cantidad inicial en la tabla de inventarios de una bodega por defecto. Los datos de entrada deben incluirse en el cuerpo de la solicitud en formato JSON. Ejemplo de datos de entrada:

  ```
  json
  ```

- ```
  {
    "id": 1,
    "nombre": "nombre del producto",
    "descripcion":"descripcion del producto",
    "cantidad":14,
    "id_inv": 4
  }
  ```

### Ruta: `/inventarios`

- `POST /inventarios`: Inserta un nuevo registro en la tabla de inventarios. Los parámetros de entrada deben incluirse en el cuerpo de la solicitud en formato JSON. Ejemplo de datos de entrada:

  ```
  json
  ```

- ```
  {
    "id": 1
    "id_producto": 1,
    "id_bodega": 1,
    "cantidad": 5
  }
  ```

## Ejecución del Proyecto

Una vez que hayas configurado el proyecto se hayan ejecutado correctamente, puedes iniciar el servidor con el siguiente comando:

```
npm run dev
```

El servidor se ejecutará en el puerto especificado en el archivo `.env` (por defecto, el puerto 3000).

