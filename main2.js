import { init as cargarDatos } from './carga_datos.js';

document.addEventListener('DOMContentLoaded', async function() { 
    var mymap = L.map('mapid').setView([16.75, -92.5], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(mymap);

    try {
        var dataByMun = await cargarDatos();

        console.log(dataByMun);
        
        dataByMun.forEach(function(mun) {
            var marker = L.marker(mun.coord).addTo(mymap);
            marker.bindPopup(`<b>Nombre:</b> ${mun.municipio}<br><b>Conteo de desapariciones:</b> ${mun.conteo}`);
        });
    } catch (error) {
        console.error('Hubo un error al cargar los datos:', error);
    }
});

