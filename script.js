// Referencias
const contenedor = document.getElementById("container");
const offcanvasTitle = document.getElementById("offcanvasLabel");
const offcanvasBody = document.querySelector(".offcanvas-body");
const offcanvasElement = document.getElementById("offcanvas");

function obtenerDatos(data) {
    contenedor.innerHTML = `
        <div class="container-fluid">
            <div class="row">
                ${data
                    .map(
                        (pais, index) => `
                        <div class="card mb-3" style="max-width: 540px; cursor: pointer;" data-index="${index}">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="${pais.flags.svg}" class="img-fluid rounded-start" alt="${pais.name.common}">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${pais.name.common}</h5>
                                        <p class="card-text">${pais.name.official}</p>
                                        <p class="card-text"><small class="text-body-secondary">${pais.capital}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                    )
                    .join("")}
            </div>
        </div>
    `;
    document.querySelectorAll(".card").forEach((card) => {
        card.addEventListener("click", () => {
            const index = card.getAttribute("data-index");
            const pais = data[index];
            mostrarDetallesEnOffcanvas(pais);
        });
    });
}

function mostrarDetallesEnOffcanvas(pais) {
    offcanvasTitle.textContent = pais.name.common;
    offcanvasBody.innerHTML = `
        <p><strong>Nombre oficial:</strong> ${pais.name.official}</p>
        <p><strong>Capital:</strong> ${pais.capital}</p>
        <p><strong>Mapa de Google:</strong> <a href="${pais.maps.googleMaps}" target="_blank">Ver en Google Maps</a></p>
    `;
    const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
    offcanvas.show();
}

const DATOS = "https://restcountries.com/v3.1/all?fields=name,flags,maps,capital";

fetch(DATOS)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error en la solicitud: " + response.status);
        }
        return response.json();
    })
    .then((data) => {
        obtenerDatos(data);
    })
    .catch((error) => console.error(error));
