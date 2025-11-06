const { response } = require("express");
const { ObjectId } = require("mongodb");

// GET: get All locations
exports.getAllLocations = async (req, res) => {
    
    try{
      const db = req.app.locals.db;
      const locations = await db.collection('Locations-Collection').find({}).toArray();
      res.status(200).json(locations); 
    } catch(error) {
        console.error('Fehler beim Abrufen der Locations', error);
        res.status(500).json({message: 'Server-Fehler beim Abrufen der Locations'});
    }
}

//POST: creat one Location
exports.createLocation = async (req, res) => {
    try{
        const db = req.app.locals.db;
        const result = await db.collection('Locations-Collection').insertOne(req.body);
        res.status(201).json({
            message: 'Location erfolgreich erstellt',
            insertedId: result.insertedId
        });

    }catch(error){
        console.error('Fehler beim Erstellen der Location', error);
        res.status(500).json({message: 'Server-Fehler beim Erstellen der Location' });

    }
}

// GET: get one Location by its ID
exports.getLocationById = async (req, res) => {
    try{
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Ungültige Location-ID' });
        }

        const db = req.app.locals.db;
        const location = await db.collection('Locations-Collection').findOne({_id: new ObjectId(id)});

        if (!location) {
            return res.status(404).json({ message: 'Location nicht gefunden' });
        }

        res.status(200).json(location);

    }catch(error){
        console.error('Fehler beim Abrufen der Location:', error);
        res.status(500).json({ message: 'Server-Fehler beim Abrufen der Location' });
    }
}

// PUT: update a Location by its ID
exports.updateLocation = async (req, res) => {
    try{
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Ungültige Location-ID' });
        }

        const db = req.app.locals.db;
        const result = await db.collection('Locations-Collection').updateOne(
            {_id: new ObjectId(id)},
            {$set: req.body}
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Location nicht gefunden' });
        }

        res.status(200).json({ 
            message: 'Location erfolgreich aktualisiert',
            modifiedCount: result.modifiedCount
        });

    }catch(error){
        console.error('Fehler beim Aktualisieren der Location:', error);
        res.status(500).json({ message: 'Server-Fehler beim Aktualisieren der Location' });
    }
}

// DELETE: delete a Location by its ID
exports.deleteLocation = async (req, res) => {
    try{
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Ungültige Location-ID' });
        }

        const db = req.app.locals.db;
        const result = await db.collection('Locations-Collection').deleteOne({_id: new ObjectId(id)});

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Location nicht gefunden' });
        }

        res.status(200).json({ 
            message: 'Location erfolgreich gelöscht',
            deletedCount: result.deletedCount
        });

    }catch(error){
        console.error('Fehler beim Löschen der Location:', error);
        res.status(500).json({ message: 'Server-Fehler beim Löschen der Location' });
    }
}
