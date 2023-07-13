import express from 'express';
import appBodegas from './routers/bodegas.js';
import appProductos from './routers/productos.js';
import appInventarios from './routers/inventarios.js';

const app = express();

app.use(express.json());

app.use("/bodegas", appBodegas);

app.use("/Productos", appProductos);

app.use("/inventarios", appInventarios);

const config = JSON.parse(process.env.MY_CONFIG);

//MY_CONFIG = {"host": "127.6.9.12", "port": 5011}

app.listen(config, () => {
    console.log(`Server running at http://${config.host}:${config.port}`);
});
