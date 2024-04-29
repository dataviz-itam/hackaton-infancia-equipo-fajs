var rutaArchivo = 'grouped_data.json'; 

// Modificar cargarJSON para que devuelva directamente el JSON cargado
function cargarJSON() {
    return new Promise((resolve, reject) => {
        d3.json(rutaArchivo).then(function(json_data) {
            resolve(json_data); // Resolver la promesa con los datos cargados
        }).catch(function(error) {
            console.error('Error al cargar el archivo JSON:', error); 
            reject(error); // Rechazar la promesa en caso de error
        });
    });
}

async function init() {
    let data_by_mun = await cargarJSON();   
    console.log('Prueba:', data_by_mun);
    return data_by_mun; 
}

init();

export { init };