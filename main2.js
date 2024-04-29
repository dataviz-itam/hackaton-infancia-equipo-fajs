import {init as cargarDatos } from './carga_datos.js';

// Espera a que el documento esté completamente cargado
document.addEventListener("DOMContentLoaded", async () => {
    const dataByMun = await cargarDatos();

    // Configuración inicial de la proyección y el SVG
    const width = 960, height = 500;
    const svg = d3.select("#graph").append("svg")
        .attr("width", width)
        .attr("height", height);

    // Proyección geográfica
    const projection = d3.geoMercator()
        .center([-92.5, 16.75]) // Centro aproximado de Chiapas
        .scale(7000)
        .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Carga y dibuja los municipios
    d3.json("path/to/municipios_chiapas.geojson").then(geoData => {
        svg.selectAll("path")
            .data(geoData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", d => {
                const munData = dataByMun.find(m => m.municipio === d.properties.NOMBRE);
                return colorScale(munData ? munData.conteo : 0);
            })
            .on("mouseover", (event, d) => {
                const munData = dataByMun.find(m => m.municipio === d.properties.NOMBRE);
                // Mostrar datos en un tooltip o en un elemento HTML
                // Ejemplo: Actualiza un div con la información
                d3.select("#info-box").html(`Nombre: ${d.properties.NOMBRE}<br>Conteo de desapariciones: ${munData ? munData.conteo : 0}`)
                    .style("visibility", "visible");
            })
            .on("mouseout", () => {
                d3.select("#info-box").style("visibility", "hidden");
            });
    });

    // Definir la escala de colores
    const maxCount = Math.max(...dataByMun.map(d => d.conteo));
    const colorScale = d3.scaleLinear()
        .domain([0, maxCount])
        .range(["green", "red"]);
});
