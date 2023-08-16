import dotenv from "dotenv"
import { MongoClient } from "mongodb"

dotenv.config("../"); 

export async function con() {
    try {
        const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.nne2igi.mongodb.net/${process.env.ATLAS_DB}`
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        const client = await MongoClient.connect(uri, options);
        return client.db();
    } catch (error) {
        console.error("Error en la conexión a la base de datos:", error);
        throw error; 
    }
}