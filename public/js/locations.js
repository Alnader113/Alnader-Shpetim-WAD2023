const API_BASE_URL = 'http://localhost:3000';


async function getAllLocations() {
    try {
        const response = await fetch(`${API_BASE_URL}/locations`);
        if (!response.ok) throw new Error('Fehler beim Laden der Locations');
        return await response.json();
    } catch (error) {
        console.error('Fehler beim Abrufen der Locations:', error);
        alert('Locations konnten nicht geladen werden.');
        return [];
    }
}

async function getLocationByID(id) {
    try{
       const response = await fetch(`${API_BASE_URL}/locations/${id}`);
       if(!response.ok) throw new Error('Fehler beim Laden der gesuchten Location');
       return await response.json();
    } catch (error) {
        console.error('Fehler beim Abrufen der Location:', error);
        alert('Location konnte nicht geladen werden.');
        return null;
    }
}

async function createLocation(locationData) {
    try {
        const response = await fetch(`${API_BASE_URL}/locations`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(locationData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Location erfolgreich erstellt!');
            return data;
        } else {
            alert(data.message || 'Fehler beim Erstellen der Location');
            return null;
        }
    } catch (error) {
        console.error('Fehler beim Erstellen der Location:', error);
        alert('Location konnte nicht erstellt werden.');
        return null;
    }
}

async function updateLocation(id, locationData) {
    try {
        const response = await fetch(`${API_BASE_URL}/locations/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(locationData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Location erfolgreich aktualisiert!');
            return true;
        } else {
            alert(data.message || 'Fehler beim Aktualisieren der Location');
            return false;
        }
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Location:', error);
        alert('Location konnte nicht aktualisiert werden.');
        return false;
    }
}

async function deleteLocation(id){
    try {
        const response = await fetch(`${API_BASE_URL}/locations/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Location erfolgreich gelöscht!');
            return true;
        } else {
            alert(data.message || 'Fehler beim Löschen der Location');
            return false;
        }
    } catch (error) {
        console.error('Fehler beim Löschen der Location:', error);
        alert('Location konnte nicht gelöscht werden.');
        return false;
    }
}

async function getCoordinatesFromAddress(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    
    try {
        console.log('Suche Koordinaten für:', address);
        
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('Nominatim Response:', data);
        
        if (data && data.length > 0) {
            const coords = {
                latitude: parseFloat(data[0].lat),
                longitude: parseFloat(data[0].lon)
            };
            
            console.log('Gefundene Koordinaten:', coords);
            return coords;
        } else {
            throw new Error('Keine Koordinaten für diese Adresse gefunden.');
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der Koordinaten:', error);
        alert('Koordinaten konnten nicht gefunden werden. Bitte Adresse überprüfen.');
        throw error;
    }
}