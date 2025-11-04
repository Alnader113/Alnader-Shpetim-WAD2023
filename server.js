require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');



const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));





// Datenbankverbindung
const url = process.env.MONGO_CONNECTION_STRING;
const dbName = process.env.MONGOdb_NAME;

const client = new MongoClient(url);

async function connectDB(){
    try{
        await client.connect();
        console.log("DB connected successfully!")

        const db = client.db(dbName);
        return db;
    } catch (error) {
        console.error("Database connection failed", error);
        throw error;
    }
}

// Routen laden
require("./app/routes/routes.js")(app);

// Server starten
async function startserver(){
    try{
        const db = await connectDB();
        app.locals.db = db;
        const port = process.env.PORT || 3000;
        app.listen(port, () =>{
            console.log(`Server läuft auf http://localhost:${port}`)
        })
    } catch(error){
        console.error("Server start failed:", error)
        process.exit(1);
    }
}

startserver();




