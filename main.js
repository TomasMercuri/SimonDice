let movimientosMaquina = [];
let movimientosUsuario = [];
let contadorRondas = 0;
let maxPuntuacion = 0;

// BOTON COMENZAR
document.querySelector('.contador-rondas button').onclick = function(){
    reiniciarJuego();
    turnoMaquina();
};


// TURNO DE LA MAQUINA
function turnoMaquina(){
    contadorRondas++;
    actualizarRonda();
    bloquearInteraccionUsuario();
    actualizarEstado('Turno de la maquina');
    const numeroGenerado = generarNumeroAleatorio();
    movimientosMaquina.push(numeroGenerado);
    console.log(movimientosMaquina);

    movimientosMaquina.forEach(function(numero, i){
        const retrasoMaquina = (i + 1) * 1000;
        setTimeout(function(){
            resaltarCuadrado(numero);
        }, retrasoMaquina);
    });

    const RETRASO_TURNO_JUGADOR = (movimientosMaquina.length + 1) * 1000;

    setTimeout(turnoUsuario, RETRASO_TURNO_JUGADOR);
}

function generarNumeroAleatorio() {
    return Math.floor((Math.random() * 4) + 1);  // return Math.floor((Math.random() * (max - min + 1)) + min);
}

function bloquearInteraccionUsuario(){
    document.querySelectorAll('.cuadro').forEach(function(cuadro){
        cuadro.onclick = function(){}
    });
}


// TURNO DEL JUGADOR
function turnoUsuario(){
    actualizarEstado('Turno del usuario');
    movimientosUsuario = [];
    let cuadroEquivocado = false;

    document.querySelectorAll('.cuadro').forEach(function(cuadro, i){
        cuadro.onclick = function(){
            const cuadroSeleccionado = i + 1;
            movimientosUsuario.push(cuadroSeleccionado);
            resaltarCuadrado(cuadroSeleccionado);
            cuadroEquivocado = comprobarCuadrosIguales();
            if(movimientosUsuario.length === movimientosMaquina.length && cuadroEquivocado){
                bloquearInteraccionUsuario();
                setTimeout(turnoMaquina, 1500);
            }
        };
    });
}


function comprobarCuadrosIguales(){
    const i = movimientosUsuario.length - 1;
    if(movimientosMaquina[i] !== movimientosUsuario[i]){
        perder();
    }else{
        return true;
    }
}

function actualizarRonda(){
    document.querySelector('.ronda span').textContent = contadorRondas;
}

function mejorPuntuacion(){
    if(contadorRondas > maxPuntuacion){
        document.querySelector('.nav-container .mejor-puntaje span').textContent = contadorRondas;
        maxPuntuacion = contadorRondas;
    }
}


// PERDER
function perder(){
    actualizarEstado('Perdiste, Toca comenzar para jugar otra vez');
    mejorPuntuacion();
    reiniciarJuego();
}

function actualizarEstado(mensaje){
    document.querySelector('.mensaje p').textContent = mensaje;
}

function reiniciarJuego(){
    contadorRondas = 0;
    movimientosMaquina = [];
    movimientosUsuario = [];
    bloquearInteraccionUsuario();
    actualizarRonda();
}


// RESALTAR CUADRO
function resaltarCuadrado(numero){
    document.querySelector(`.cuadro-${numero}`).classList.add('resaltado');
    setTimeout(function(){
        document.querySelector(`.cuadro-${numero}`).classList.remove('resaltado');
    }, 500);
}
