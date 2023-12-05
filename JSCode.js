function showLogin() {
    document.getElementById('login').style.display = 'block';
    document.getElementById('main').style.display = 'none';
    document.getElementById('add').style.display = 'none';
    document.getElementById('updateDelete').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
}

// Zeige standardmäßig die Login-Seite
showLogin();


const admina = { username: "admina", password: "password", role: "admin" };
const normalo = { username: "normalo", password: "password", role: "non-admin" };
var currentUser = {
    username : '',
    password : ''


};

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    const isAdmin = username === 'admina' && password === 'password'
    localStorage.setItem("isAdmin", isAdmin)


    // Check für admina
    if (username === 'admina' && password === 'password') {
        showAdminMain()
    }
    // Check für normalo
    else if (username === 'normalo' && password === 'password') {
        showNormalMain();
    }
    // Falsche Kombination von username/passwort
    else {
        alert('Falsche Anmeldeinformationen.');
    }

}

function showUpdateDelete(location, locationData1) {
    let hermannplatz = {
        name: "Hermannplatz",
        desc: "viel Autoverkehr, ",
        street: "hermannplatz",
        zip: "10967",
        city: "Berlin",
        state: "Berlin",
        lat: 52.485664724,
        lon: 13.421498314
    }

    let alexanderplatz = {
        name: "Alxanderplatz",
        desc: "Luftverschmutzung ",
        street: "alexanderplatz",
        zip: "10178",
        city: "Berlin",
        state: "Berlin",
        lat: 52.5219814,
        lon: 13.413635717448294
    }

    let zoologischergarten = {
        name: "S+U Bahnhof Zoologischer garten",
        desc: "Umweltverschmutzung ",
        street: "Hardenbergplatz 13",
        zip: "10623",
        city: "Berlin",
        state: "Berlin",
        lat: 52.5071378,
        lon: 13.331868
    }
    document.getElementById('mainAdmina').style.display = 'none'; // Verstecke den aktuellen Hauptbildschirm
    document.getElementById('mainNormal').style.display = 'none'; // Verstecke den aktuellen Hauptbildschirm
    document.getElementById('updateDelete').style.display = 'block'; // Zeige die updateDelete-Seite an
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
    if(!isAdmin) {
        console.log(isAdmin)
        document.getElementById('updateBtn').style.display = 'none'
        document.getElementById('deleteBtn').style.display='none'
    }
    const lng = '13.421498314'
    const lat = '52.485664724'
   // document.getElementById('map').src = 'https://maps.google.com/maps?q=' + lat + ',' + lng + '&t=&z=15&ie=UTF8&iwloc=&output=embed'

    let locationData = null;
    switch (location) {
        case 'hermannplatz':
            locationData = hermannplatz;
            break;
        case 'alexanderplatz':
            locationData = alexanderplatz;
            break;
        case 'zoologischergarten' :
            locationData = zoologischergarten;
            break;
        default:
            locationData = locationData1;
            break;
    }
    if (locationData !== null) {
        document.getElementById('updateLocationName').value = locationData.name;
        document.getElementById('updateLocationDescription').value = locationData.desc;
        document.getElementById('updateLocationStreet').value = locationData.street;
        document.getElementById('updateLocationZip').value = locationData.zip;
        document.getElementById('updateLocationCity').value = locationData.city;
        document.getElementById('updateLocationState').value = locationData.state;
        document.getElementById('updateLocationLat').value = locationData.lat;
        document.getElementById('updateLocationLon').value = locationData.lon;
    }
}



/*function showAdminMain() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('mainAdmina').style.display = 'block';
    const locations = JSON.parse(localStorage.getItem('locations'))
    const locationLinks = document.getElementById('locationLinks');
    if (locationLinks && locations && locations.length > 0){
        locations.forEach(location => {
            const liElement = document.createElement('li');
            const aElement = document.createElement('a');
            aElement.innerHTML = location.street ;
            aElement.href = '#'
            aElement.onclick = ev => {
                showUpdateDelete(location.city, location)
            }
            liElement.appendChild(aElement);
            locationLinks.appendChild(liElement);
        })

    }
}*/


function showAdminMain() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('mainAdmina').style.display = 'block';
    const locations = JSON.parse(localStorage.getItem('locations'))
    const locationLinks = document.getElementById('locationLinks');

    if (locationLinks && locations && locations.length > 0){
        locations.forEach(location => {
            const linkExists = Array.from(locationLinks.getElementsByTagName('a')).some(link => link.textContent === location.street);
            if (!linkExists) {
                const liElement = document.createElement('li');
                const aElement = document.createElement('a');
                aElement.innerHTML = location.street ;
                aElement.href = '#'
                aElement.onclick = ev => {
                    showUpdateDelete(location.city, location)
                }
                liElement.appendChild(aElement);
                locationLinks.appendChild(liElement);
            }
        })
    }
}


function showNormalMain() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('mainNormal').style.display = 'block';
}

function openAddLocation() {
    document.getElementById('mainAdmina').style.display = 'none';
    document.getElementById('add').style.display = 'block';
}

function logout() {
    localStorage.removeItem('isAdmin');
    document.getElementById('login').style.display = 'block';
    document.getElementById('mainAdmina').style.display = 'none';
    document.getElementById('mainNormal').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

}
function deleteLocation(){
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
    if(!isAdmin){
        document.getElementById('mainNormal').style.display = 'block';
    }else {
        document.getElementById('mainAdmina').style.display = 'block';
    }
    document.getElementById('updateDelete').style.display = 'none';

}
function updateLocation(){
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
    if(!isAdmin){
        document.getElementById('mainNormal').style.display = 'block';
    }else {
        document.getElementById('mainAdmina').style.display = 'block';
    }
    document.getElementById('updateDelete').style.display = 'none';
    document.getElementById('login').style.display = 'none';
}
function cancelUpdateDelete() {
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
    if(!isAdmin){
        document.getElementById('mainNormal').style.display = 'block';
    }else {
        document.getElementById('mainAdmina').style.display = 'block';
    }
    document.getElementById('updateDelete').style.display = 'none';
}
function cancelAdd() {

    document.getElementById('mainAdmina').style.display = 'block';
    document.getElementById('add').style.display = 'none';
}


async function getCoordinatesFromAddress(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    return new Promise((resolve, reject)=> {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data && data.length > 0) {
                    const latitude = data[0].lat;
                    const longitude = data[0].lon;
                    console.log({ latitude,longitude})
                    resolve({ latitude, longitude})
                    document.getElementById('locationLat').value = latitude;
                    document.getElementById('locationLon').value = longitude;
                } else {
                    reject(new Error('Keine Koordinaten für diese Adresse gefunden. Bitte Adresse überprüfen.'))
                    alert('Keine Koordinaten für diese Adresse gefunden. Bitte Adresse überprüfen.');
                }
            })
            .catch(error => {
                // Fehler beim API-Aufruf
                console.error('Fehler beim Abrufen der Koordinaten:', error);
                reject(new Error('Fehler beim Abrufen der Koordinaten:'))


                // alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
            });
    })
}
async function validateAddForm() {
    const city = document.getElementById('locationCity').value;
    const street = document.getElementById('locationStreet').value;
    // alle werte noch
    const description = document.getElementById('locationDescription').value;
    const zip = document.getElementById('locationZip').value;
    const name = document.getElementById('locationName').value

    const {latitude, longitude} = await getCoordinatesFromAddress(city + '+' + street);
    const newLocation = {
        zip,
        description,
        name,
        city,
        street,
        lat: latitude,
        lon: longitude,
    }
    const locations = JSON.parse(localStorage.getItem('locations') || '[]')
    locations.push(newLocation)
    localStorage.setItem('locations', JSON.stringify(locations))
    document.getElementById('mainAdmina').style.display = 'block';
    document.getElementById('add').style.display = 'none';

    showAdminMain();
}

