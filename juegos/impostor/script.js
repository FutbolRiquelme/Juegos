const palabras = [
    { nombre: "Messi", imagen: "imagenes/messi.jpg" },
    { nombre: "Cristiano Ronaldo", imagen: "imagenes/cristiano_ronaldo.jpg" },
    { nombre: "Maradona", imagen: "imagenes/maradona.jpg" },
    { nombre: "Mbappé", imagen: "imagenes/mbappe.jpg" },
    { nombre: "Palermo", imagen: "imagenes/palermo.jpg" },
    { nombre: "Quintero", imagen: "imagenes/quintero.jpg" },
    { nombre: "Ronaldinho", imagen: "imagenes/ronaldinho.jpg" },
    { nombre: "Enzo Fernández", imagen: "imagenes/enzo_fernandez.jpg" },
    { nombre: "Merentiel", imagen: "imagenes/merentiel.jpg" },
    { nombre: "Cavani", imagen: "imagenes/cavani.jpg" },
    { nombre: "Julián Álvarez", imagen: "imagenes/julian_alvarez.jpg" },
    { nombre: "Neymar", imagen: "imagenes/neymar.jpg" },
    { nombre: "Riquelme", imagen: "imagenes/riquelme.jpg" },
    { nombre: "Cafu", imagen: "imagenes/cafu.jpg" },
    { nombre: "Ronaldo Nazario", imagen: "imagenes/ronaldo_nazario.jpg" },
    { nombre: "Pelé", imagen: "imagenes/pele.jpg" },
    { nombre: "Dante", imagen: "imagenes/dante.jpg" },
    { nombre: "Davo", imagen: "imagenes/davo.jpg" },
    { nombre: "Lacobraa", imagen: "imagenes/lacobraa.jpg" },
    { nombre: "Haaland", imagen: "imagenes/haaland.jpg" },
    { nombre: "Harry Kane", imagen: "imagenes/harry_kane.jpg" },
    { nombre: "Lamine Yamal", imagen: "imagenes/lamine_yamal.jpg" },
    { nombre: "Jude Bellingham", imagen: "imagenes/jude_bellingham.jpg" },
    { nombre: "Vinicius Jr", imagen: "imagenes/vinicius_jr.jpg" },
    { nombre: "Lewandowski", imagen: "imagenes/lewandowski.jpg" },
    { nombre: "Salah", imagen: "imagenes/salah.jpg" },
    { nombre: "Kevin De Bruyne", imagen: "imagenes/kevin_de_bruyne.jpg" },
    { nombre: "Lukaku", imagen: "imagenes/lukaku.jpg" },
    { nombre: "Hakimi", imagen: "imagenes/hakimi.jpg" },
    { nombre: "Neuer", imagen: "imagenes/neuer.jpg" },
    { nombre: "Dibu Martínez", imagen: "imagenes/dibu.jpg" },
    { nombre: "Alisson", imagen: "imagenes/alisson.jpg" },
    { nombre: "Ederson", imagen: "imagenes/ederson.jpg" },
    { nombre: "Courtois", imagen: "imagenes/courtois.jpg" },
    { nombre: "Ter Stegen", imagen: "imagenes/ter_stegen.jpg" },
    { nombre: "Casillas", imagen: "imagenes/casillas.jpg" },
    { nombre: "Lev Yashin", imagen: "imagenes/lev_yashin.jpg" },
    { nombre: "Oliver Kahn", imagen: "imagenes/oliver_kahn.jpg" },
    { nombre: "Buffon", imagen: "imagenes/buffon.jpg" }
];

let roles = [];
let jugadorActual = 0;

function empezar(){

    let cantidad = parseInt(document.getElementById("cantidad").value);

    if(cantidad < 3){
        alert("Mínimo 3 jugadores.");
        return;
    }

    let palabra = palabras[Math.floor(Math.random()*palabras.length)];

    roles = [];

    for(let i=0;i<cantidad;i++){
        roles.push(palabra);
    }

    let impostor = Math.floor(Math.random()*cantidad);

    roles[impostor] = "IMPOSTOR";

    jugadorActual = 0;

    document.getElementById("inicio").style.display="none";
    document.getElementById("juego").style.display="block";

    actualizarPantalla();
}

function actualizarPantalla(){

    document.getElementById("tituloJugador").innerText =
        "Jugador " + (jugadorActual+1);

    document.getElementById("palabra").style.display="none";

    document.getElementById("imagen").style.display="none";

    document.getElementById("verBtn").style.display="inline";

    document.getElementById("siguienteBtn").style.display="none";
}

function mostrarPalabra(){

    if(roles[jugadorActual] === "IMPOSTOR"){

        document.getElementById("palabra").innerText = "🚨 IMPOSTOR";

        document.getElementById("imagen").style.display = "none";

    }else{

        document.getElementById("palabra").innerText = roles[jugadorActual].nombre;

        document.getElementById("imagen").src = roles[jugadorActual].imagen;
        document.getElementById("imagen").style.display = "block";

    }

    document.getElementById("palabra").style.display = "block";

    document.getElementById("verBtn").style.display = "none";

    document.getElementById("siguienteBtn").style.display = "inline";
}

function siguienteJugador(){

    jugadorActual++;

    if(jugadorActual >= roles.length){

        document.getElementById("juego").innerHTML =
        "<h1>¡Todos ya vieron su palabra!</h1><h2>Empieza la partida.</h2>";

        return;
    }

    actualizarPantalla();

}