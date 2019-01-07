const fs = require("fs");
const gyms = require("./gyms.json");
var stringSimilarity = require("string-similarity");

candidates = Object.keys(gyms);

const lst = `Estación Metro Alfauir
Fuente dama de elche
Tomando El Sol
El Camion De Bomberos
Parque Emilio Lluch
Gulliver Pano
Macmax Sin Desayunar
Olea Europeae
El Perro, Valencia
Fuente Con Cara
Black Face
Fuente de las Sirenas meninas
Estación De Font Almader
parque virgen del castillo
Parque de los puentes
El De La Sidra
Escultura a Ausias March
Jardín de las Hespérides, Vale
Gusano Punkercito
Águila En El Tejado
Fuentecilla
Fuente Kilombo
Bebedero Pajaros
Metal Head Sculpture
Avión Parque del Oeste
Fuente del Parque
Flautista de metal
El Olivo
Century Old Olive Tree
Fuente Sagrada
Parque Beniferri
Parque Niños
Apolo 13
Windows Church`;

let ct = 0;

const dataToSave = lst.split("\n").reduce((acc, name) => {
    var matches = stringSimilarity.findBestMatch(name, candidates);
    let gym = gyms[matches.bestMatch.target];

    if (matches.bestMatch.rating > 0.8) {
        return acc + `${matches.bestMatch.target}, ${gym.lat}, ${gym.lng}\n`;
    } else {
        ct++;
        console.log(
            `Best match for ${name} is '${matches.bestMatch.target}', '${
                matches.bestMatch.rating
            }'`
        );
        return acc;
    }
}, "");

fs.writeFileSync("./exgyms.csv", dataToSave);
console.log("Could not look up", ct);
