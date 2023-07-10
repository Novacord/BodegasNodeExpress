import express from 'express';
import appBodegas from './routers/bodegas.js';

const app = express();

app.use(express.json());

app.use("/bodegas", appBodegas);

const config = {
    host: '127.6.9.12',
    port: 5011
}

app.listen(config, () => {
    console.log(`Server running at http://${config.host}:${config.port}`);
});
