async function login(event) {
    if (event) {
        event.preventDefault();
    }
    
    try{
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if(!username || !password ){
            alert('Bitte Benutzername und Passwort eingeben!');
            return;
        }

        const response = await fetch ("http://localhost:3000/users", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})

        });

        const data = await response.json();

        if(response.ok) {
            handleSuccessfulLogin(data);
        } else{
            alert(data.message || 'Falsche Anmeldeinformation !');
        }

    } catch (error){
        console.error('Login-Fehler:', error);
        alert('Verbindung zum Server fehlgeschlagen.');
    }
}


function handleSuccessfulLogin(user){
    localStorage.setItem('isAdmin', user.role ==='admin');
    localStorage.setItem('aktuellerNutzer', JSON.stringify(user));

    if(user.role === 'admin'){
        document.body.classList.add('is-admin');
    }else{
        document.body.classList.remove('is-admin');
    }

    document.getElementById('login').style.display = 'none';
    document.getElementById('main').style.display = 'block';

    loadAndDisplayLocations();
}

function getCurrentUser(){
    return JSON.parse(localStorage.getItem('aktuellerNutzer'));
}

function isAdmin(){
    return JSON.parse(localStorage.getItem('isAdmin')) === true;
}

function logout(){
    localStorage.removeItem('isAdmin');
    document.getElementById('main').style.display = 'none';
    document.getElementById('login').style.display = 'block';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}