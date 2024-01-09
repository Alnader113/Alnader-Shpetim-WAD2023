//

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const client = new MongoClient('mongodb://firstmogo_db_karl:AiATFwLlj@mongodb1.f4.htw-berlin.de:27017/firstmogo_db');
const dbName = 'firstmogo_db';
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Datenbankverbindung
async function connectDB() {
    await client.connect();
    console.log('Verbunden mit MongoDB');
    return client.db(dbName);
}
// User und Location Routen
const userRouter = express.Router();
const locationRouter = express.Router();
// User-Endpunkt Methoden
// User-Endpunkt Methoden für Login
userRouter.route('/')
    .post(async (req, res) => {
        const { username, password } = req.body;
        const db = await connectDB();

        // Suche den Benutzer in der Datenbank
        const user = await db.collection('User-Collection').findOne({ username: username });

        if (user && user.password === password) {
            // Erfolgreiche Authentifizierung
            delete user['password']
            res.status(200).json(user);
        } else {
            // Authentifizierung fehlgeschlagen
            res.status(401).json({ message: "Ungültige Anmeldedaten" });
        }
    });

// Location-Endpunkt Methoden
locationRouter.route('/loc') // Hier verwenden wir /loc als Endpunkt
    .get(async (req, res) => {
        try {
            const db = await connectDB();
            const locations = await db.collection('Locations-Collection').find({}).toArray();
            res.status(200).json(locations); // JSON-Daten als Antwort senden
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server-Fehler' }); // Im Fehlerfall einen 500er-Status senden
        }
    })

    .post(async (req, res) => {
        const db = await connectDB();
        const result = await db.collection('Locations-Collection').insertOne(req.body);
        res.status(201).json(result);
    });
locationRouter.route('/:id')
    .get(async (req, res) => {
        const id = req.params.id;
        const db = await connectDB();

        try {
            const location = await db.collection('Locations-Collection').findOne({ _id: new ObjectId(id) });

            if (location) {
                res.json(location);
            } else {
                res.status(404).json({ message: "Location nicht gefunden" });
            }
        } catch (error) {
            res.status(500).json({ message: "Fehler beim Abrufen der Location", error: error });
        }
    });
// Router verwenden
app.use('/users', userRouter);
app.use('/loc', locationRouter);
// Server starten
const port = 3000;
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
