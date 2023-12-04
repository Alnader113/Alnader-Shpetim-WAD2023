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

function loginUser(username, password) {
    // Überprüfe, ob der Benutzer existiert und das Passwort korrekt ist
    if (username === admina.username && password === admina.password) {
        currentUser = admina; // Setze den eingeloggten Benutzer als admina
    } else if (username === normalo.username && password === normalo.password) {
        currentUser = normalo; // Setze den eingeloggten Benutzer als normalo
    } else {
        currentUser = null; // Falsche Anmeldedaten
    }
    return currentUser;
}

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






function showUpdateDelete(location) {
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
    document.getElementById('map').src = 'https://maps.google.com/maps?q=' + lat + ',' + lng + '&t=&z=15&ie=UTF8&iwloc=&output=embed'

    let locationDate = null;
    switch (location) {
        case 'hermannplatz':
            locationData = hermannplatz;
            break;
        // Füge weitere Cases für andere Locations hinzu, wenn nötig
        default:
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



function showAdminMain() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('mainAdmina').style.display = 'block';
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
    document.getElementById('login').style.display = 'block';
    document.getElementById('mainAdmina').style.display = 'none';
    document.getElementById('mainNormal').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

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


function getCoordinatesFromAddress(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const latitude = data[0].lat;
                const longitude = data[0].lon;


                document.getElementById('updateLocationLat').value = latitude;
                document.getElementById('updateLocationLon').value = longitude;
            } else {

                alert('Keine Koordinaten für diese Adresse gefunden. Bitte Adresse überprüfen.');
            }
        })
        .catch(error => {
            // Fehler beim API-Aufruf
            console.error('Fehler beim Abrufen der Koordinaten:', error);
            alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
        });
}

