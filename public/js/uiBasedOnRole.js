
function showLogin(){
    document.getElementById('login').style.display = 'block';
    document.getElementById('main').style.display = 'none';
    document.getElementById('add').style.display = 'none';
    document.getElementById('updateDelete').style.display = 'none';
    
}

async function loadAndDisplayLocations(){
    try{
        const locations = await getAllLocations();
        displayLocations(locations);

        initMap();
        addLocationMarkers(locations);


    } catch(error){
        console.error('Fehler beim Laden der Locations', error);
        alert ('Locations konnten nicht geladen werden.');
    }
}

function displayLocations(locations){
    const locationList = document.getElementById('locationLinks');

    if(!locationList){
        console.error('locationLinks Element nicht gefunden');
        return;
    }

    locationList.innerHTML = '';

    if(!locations || locations.length === 0){
        locationList.innerHTML = '<li>keine Locations gefunden</li>';
        return;
    }

    locations.forEach(location => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = `${location.city} - ${location.street}`;
        
        a.onclick = (event) => {
            event.preventDefault();
            showUpdateDelete(location);
        };
        
        li.appendChild(a);
        locationList.appendChild(li);
    });
}


function openAddLocation(){
    document.getElementById('main').style.display = 'none';
    document.getElementById('add').style.display = 'block';
}

function cancelAdd(){
    document.getElementById('add').style.display = 'none';
    document.getElementById('main').style.display = 'block';
}

async function validateAddForm(){
    try{
        const name = document.getElementById('locationName').value.trim();
        const description = document.getElementById('locationDescription').value.trim();
        const street = document.getElementById('locationStreet').value.trim();
        const zip = document.getElementById('locationZip').value.trim();
        const city = document.getElementById('locationCity').value.trim();
        const state = document.getElementById('locationState').value;

        if(!name || !street || !zip || !city){
            alert('Bitte alle Pflichtfelder ausfüllen !');
            return;
        }

        const address = `${street}, ${zip} ${city}`;
        const coords = await getCoordinatesFromAddress(address);

        document.getElementById('locationLat').value = coords.latitude;
        document.getElementById('locationLon').value = coords.longitude;

        const locationData = {
            name,
            desc: description,
            street,
            zip,
            city,
            state,
            lat: coords.latitude,
            lon: coords.longitude
        };

        const result = await createLocation(locationData);

        if(result){
            cancelAdd();

            loadAndDisplayLocations();
        }

    } catch(error){
        console.error('Fehler beim Erstellen der Location:', error);
        alert('Location konnte nicht erstellt werden');

    }
}

function showUpdateDelete(location){
    document.getElementById('main').style.display = 'none';
    document.getElementById('updateDelete').style.display = 'block';

    document.getElementById('updateDelete').dataset.locationId = location._id;

    document.getElementById('updateLocationName').value = location.name || '';
    document.getElementById('updateLocationDescription').value = location.desc || '';
    document.getElementById('updateLocationStreet').value = location.street || '';
    document.getElementById('updateLocationZip').value = location.zip || '';
    document.getElementById('updateLocationCity').value = location.city || '';
    document.getElementById('updateLocationState').value = location.state || '';
    document.getElementById('updateLocationLat').value = location.lat || '';
    document.getElementById('updateLocationLon').value = location.lon || '';

}

function cancelUpdateDelete(){
    document.getElementById('updateDelete').style.display = 'none';
    document.getElementById('main').style.display = 'block';
}

async function handleUpdateLocation(){
    try{
        const locationId = document.getElementById('updateDelete').dataset.locationId;
        
        if(!locationId){
            alert('Keine Location ausgewählt.');
            return;
        }

        const name = document.getElementById('updateLocationName').value.trim();
        const description = document.getElementById('updateLocationDescription').value.trim();
        const street = document.getElementById('updateLocationStreet').value.trim();
        const zip = document.getElementById('updateLocationZip').value.trim();
        const city = document.getElementById('updateLocationCity').value.trim();
        const state = document.getElementById('updateLocationState').value;
        const lat = parseFloat(document.getElementById('updateLocationLat').value);
        const lon = parseFloat(document.getElementById('updateLocationLon').value);

        if(!name || !street || !zip || !city){
            alert('Bitte alle Pflichtfelder ausfüllen!');
            return;
        }

        const locationData = {
            name,
            desc: description,
            street,
            zip,
            city,
            state,
            lat,
            lon
        };

        const result = await updateLocation(locationId, locationData);

        if(result){
            cancelUpdateDelete();
            loadAndDisplayLocations();
        }

    } catch(error){
        console.error('Fehler beim Aktualisieren der Location:', error);
        alert('Location konnte nicht aktualisiert werden');
    }
}

async function handleDeleteLocation(){
    try{
        const locationId = document.getElementById('updateDelete').dataset.locationId;
        
        if(!locationId){
            alert('Keine Location ausgewählt.');
            return;
        }

        if(!confirm('Möchten Sie diese Location wirklich löschen?')){
            return;
        }

        const result = await deleteLocation(locationId);

        if(result){
            cancelUpdateDelete();
            loadAndDisplayLocations();
        }

    } catch(error){
        console.error('Fehler beim Löschen der Location:', error);
        alert('Location konnte nicht gelöscht werden');
    }
}