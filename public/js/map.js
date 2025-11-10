let map = null;
let markersLayer = null;

function initMap(){
    if(map){
        return;
    }

    map = L.map('map').setView([52.52, 13.405], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
    markersLayer = L.layerGroup().addTo(map);
}

function addLocationMarkers(locations){
    if(markersLayer){
        markersLayer.clearLayers();
    }

    const bounds = [];

    locations.forEach(location => {
        if(location.lat && location.lon){
            const marker = L.marker([location.lat, location.lon]);

            marker.bindPopup(`
                <strong>${location.name || 'Unbenannt'}</strong><br>
                ${location.street || ''}<br>
                ${location.zip || ''} ${location.city || ''}<br>
                <a href="#" onclick="event.preventDefault(); showUpdateDelete(${JSON.stringify(location).replace(/"/g, '&quot;')})">Details anzeigen</a>
            `);

            marker.addTo(markersLayer);

            bounds.push([location.lat, location.lon]);
        }
    });

    if(bounds.length > 0){
        map.fitBounds(bounds, {padding:[50, 50]});
    }
}