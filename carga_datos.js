var rutaArchivo = 'grouped_data.json'; 

function cargarJSON() {
    return new Promise((resolve, reject) => {
        d3.json(rutaArchivo).then(function(json_data) {
            resolve(json_data); 
        }).catch(function(error) {
            console.error('Error al cargar el archivo JSON:', error); 
            reject(error); 
        });
    });
}

async function init() {
    let data_by_mun = await cargarJSON();
    return data_by_mun; 
}

init();

export { init };