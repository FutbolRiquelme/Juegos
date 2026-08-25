// Base de datos de jugadores actualizada (Boca y River simplificados)
const jugadores = [
    { nombre: "Messi", datos: ["Barcelona", "PSG", "Inter Miami", "Argentino", "Ganó Mundial", "Ganó Champions", "Ganó Copa América", "Balón de Oro"] },
    { nombre: "Cristiano Ronaldo", datos: ["Real Madrid", "Manchester United", "Juventus", "Al Nassr", "Portugués", "Ganó Champions", "Balón de Oro"] },
    { nombre: "Di Maria", datos: ["Real Madrid", "PSG", "Benfica", "Juventus", "Manchester United", "Argentino", "Ganó Mundial", "Ganó Champions", "Ganó Copa América"] },
    { nombre: "Riquelme", datos: ["Boca", "Barcelona", "Villarreal", "Argentinos Juniors", "Argentino", "Ganó Libertadores", "Ganó Copa América"] },
    { nombre: "Iniesta", datos: ["Barcelona", "Español", "Ganó Mundial", "Ganó Champions"] },
    { nombre: "Xavi", datos: ["Barcelona", "Español", "Ganó Mundial", "Ganó Champions"] },
    { nombre: "Modric", datos: ["Real Madrid", "Tottenham", "Croata", "Ganó Champions", "Balón de Oro"] },
    { nombre: "Benzema", datos: ["Real Madrid", "Lyon", "Francia", "Ganó Champions", "Balón de Oro"] },
    { nombre: "Neymar", datos: ["Barcelona", "PSG", "Santos", "Brasil", "Ganó Champions", "Ganó Libertadores"] },
    { nombre: "Suarez", datos: ["Barcelona", "Liverpool", "Atletico Madrid", "Nacional", "Gremio", "Inter Miami", "Uruguay", "Ganó Champions", "Ganó Copa América"] },
    { nombre: "Mbappe", datos: ["PSG", "Monaco", "Real Madrid", "Francia", "Ganó Mundial"] },
    { nombre: "Haaland", datos: ["Manchester City", "Borussia Dortmund", "Noruega", "Ganó Champions"] },
    { nombre: "De Bruyne", datos: ["Manchester City", "Chelsea", "Wolfsburgo", "Bélgica", "Ganó Champions"] },
    { nombre: "Sergio Ramos", datos: ["Real Madrid", "PSG", "Sevilla", "Español", "Ganó Mundial", "Ganó Champions"] },
    { nombre: "Casemiro", datos: ["Real Madrid", "Manchester United", "Sao Paulo", "Brasil", "Ganó Champions", "Ganó Copa América"] },
    { nombre: "Kroos", datos: ["Real Madrid", "Bayern Munich", "Alemania", "Ganó Mundial", "Ganó Champions"] },
    { nombre: "Maradona", datos: ["Boca", "Barcelona", "Napoli", "Argentinos Juniors", "Argentino", "Ganó Mundial"] },
    { nombre: "Aguero", datos: ["Independiente", "Atletico Madrid", "Manchester City", "Barcelona", "Argentino", "Ganó Copa América"] },
    { nombre: "Lautaro Martinez", datos: ["Racing", "Inter", "Argentino", "Ganó Mundial", "Ganó Copa América"] },
    { nombre: "Carlos Tevez", datos: ["Boca", "Corinthians", "West Ham", "Manchester United", "Manchester City", "Juventus", "Argentino", "Ganó Champions", "Ganó Libertadores"] },
    { nombre: "Ronaldinho", datos: ["Gremio", "PSG", "Barcelona", "Milan", "Flamengo", "Atletico Mineiro", "Brasil", "Ganó Mundial", "Ganó Champions", "Ganó Libertadores", "Balón de Oro", "Ganó Copa América"] },
    { nombre: "Ronaldo Nazario", datos: ["Cruzeiro", "PSV", "Barcelona", "Inter", "Real Madrid", "Milan", "Corinthians", "Brasil", "Ganó Mundial", "Balón de Oro", "Ganó Copa América"] },
    { nombre: "Lewandowski", datos: ["Borussia Dortmund", "Bayern Munich", "Barcelona", "Polonia", "Ganó Champions"] },
    { nombre: "Zanetti", datos: ["Banfield", "Inter", "Argentino", "Ganó Champions"] },
    { nombre: "Maldini", datos: ["Milan", "Italiano", "Ganó Champions"] },
    { nombre: "Buffon", datos: ["Parma", "Juventus", "PSG", "Italiano", "Ganó Mundial"] },
    { nombre: "Julian Alvarez", datos: ["River", "Manchester City", "Argentino", "Ganó Mundial", "Ganó Champions", "Ganó Libertadores", "Ganó Copa América"] },
    { nombre: "Vinicius", datos: ["Flamengo", "Real Madrid", "Brasil", "Ganó Champions"] },
    { nombre: "Dibu Martinez", datos: ["Arsenal", "Aston Villa", "Independiente", "Argentino", "Ganó Mundial", "Ganó Copa América"] }
];

// Categorías por dificultad actualizadas
const categoriasFacil = ["Real Madrid", "Barcelona", "PSG", "Manchester City", "Argentino", "Brasil", "Español", "Francia", "Ganó Champions", "Ganó Mundial"];
const categoriasMedio = [...categoriasFacil, "Juventus", "Manchester United", "Bayern Munich", "Milan", "Uruguay", "Ganó Copa América", "Balón de Oro"];
const categoriasDificil = [...categoriasMedio, "Boca", "River", "Inter", "Napoli", "Santos", "Italiano", "Ganó Libertadores"];

let filas = [];
let columnas = [];
let casillaSeleccionada = null;

function mezclar(array) {
    return array.sort(() => Math.random() - 0.5);
}

function generarRutaImagen(categoria) {
    // AHORA ELIMINA LOS ESPACIOS EN VEZ DE PONER GUIONES (ej: "Real Madrid" -> "realmadrid.png")
    let nombreArchivo = categoria.toLowerCase()
                                 .normalize("NFD")
                                 .replace(/[\u0300-\u036f]/g, "") 
                                 .replace(/ /g, '') + ".png";
    return `file:///D:/FutbolRiquelme/imagenes/Tateti/${nombreArchivo}`;
}

function obtenerCategoriasPorDificultad() {
    let diff = document.getElementById("dificultad").value;
    if (diff === "facil") return categoriasFacil;
    if (diff === "medio") return categoriasMedio;
    return categoriasDificil;
}

function combinacionValida() {
    let catsDisponibles = obtenerCategoriasPorDificultad();

    for (let intento = 0; intento < 2000; intento++) {
        let nuevasFilas = mezclar([...catsDisponibles]).slice(0, 3);
        let restantes = catsDisponibles.filter(c => !nuevasFilas.includes(c));
        let nuevasColumnas = mezclar(restantes).slice(0, 3);

        let valido = true;

        for (let f = 0; f < 3; f++) {
            for (let c = 0; c < 3; c++) {
                let existe = jugadores.some(j => cumpleCategoria(j, nuevasFilas[f]) && cumpleCategoria(j, nuevasColumnas[c]));
                if (!existe) {
                    valido = false;
                    break;
                }
            }
            if (!valido) break;
        }

        if (valido) return { filas: nuevasFilas, columnas: nuevasColumnas };
    }
    return combinacionValida();
}

function renderizarCategoria(id, texto) {
    const contenedor = document.getElementById(id);
    const rutaImagen = generarRutaImagen(texto);
    contenedor.innerHTML = `
        <img src="${rutaImagen}" alt="${texto}" onerror="this.style.display='none'">
        <span>${texto}</span>
    `;
}

function nuevoJuego() {
    let tablero = combinacionValida();
    filas = tablero.filas;
    columnas = tablero.columnas;

    renderizarCategoria("row1", filas[0]);
    renderizarCategoria("row2", filas[1]);
    renderizarCategoria("row3", filas[2]);
    renderizarCategoria("col1", columnas[0]);
    renderizarCategoria("col2", columnas[1]);
    renderizarCategoria("col3", columnas[2]);

    document.querySelectorAll(".casilla").forEach(c => {
        c.innerHTML = "";
        c.classList.remove("correcto", "seleccionada");
    });
    casillaSeleccionada = null;
    mostrarMensaje("¡Tablero listo! Seleccioná una casilla.", "white");
}

function seleccionarCasilla(casilla) {
    if (casilla.classList.contains("correcto")) return;

    document.querySelectorAll(".casilla").forEach(c => c.classList.remove("seleccionada"));
    
    casillaSeleccionada = casilla;
    casillaSeleccionada.classList.add("seleccionada");
    mostrarMensaje("Casilla seleccionada. Ingresá el jugador.", "#eab521");
    document.getElementById("jugador").focus();
}

function comprobar() {
    if (!casillaSeleccionada) {
        mostrarMensaje("⚠️ Primero seleccioná una casilla.", "#facc43");
        return;
    }

    let input = document.getElementById("jugador");
    let nombreStr = input.value.toLowerCase().trim();

    let nombreNormalizado = nombreStr.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    let jugadorEncontrado = jugadores.find(j => {
        let jName = j.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return jName === nombreNormalizado;
    });

    if (!jugadorEncontrado) {
        mostrarMensaje("❌ Jugador no encontrado en la base de datos.", "#ff4b2b");
        return;
    }

    let casillas = Array.from(document.querySelectorAll(".casilla"));
    let posicion = casillas.indexOf(casillaSeleccionada);
    let fila = filas[Math.floor(posicion / 3)];
    let columna = columnas[posicion % 3];

    if (cumpleCategoria(jugadorEncontrado, fila) && cumpleCategoria(jugadorEncontrado, columna)) {
        casillaSeleccionada.innerHTML = jugadorEncontrado.nombre;
        casillaSeleccionada.classList.remove("seleccionada");
        casillaSeleccionada.classList.add("correcto");
        mostrarMensaje("✅ ¡Correcto!", "#eab521");
        casillaSeleccionada = null;
        input.value = "";
    } else {
        mostrarMensaje(`❌ ${jugadorEncontrado.nombre} no cumple esas categorías.`, "#ff4b2b");
    }
}

function cumpleCategoria(jugador, categoria) {
    return jugador.datos.includes(categoria);
}

function mostrarMensaje(texto, color) {
    let msj = document.getElementById("mensaje");
    msj.innerHTML = texto;
    msj.style.color = color;
}

nuevoJuego();