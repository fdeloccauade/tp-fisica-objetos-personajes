let gravedad = 98; // Aceleración debida a la gravedad (m/s^2)
function calcularFisicas(cuerpo, dt) {

    // MRUV
    cuerpo.vel = suma(cuerpo.vel, mul(cuerpo.ace, dt))
    cuerpo.pos = suma3(cuerpo.pos, mul(cuerpo.vel, dt), mul(cuerpo.ace, 0.5*dt*dt))
    cuerpo.ace.x = 0
    cuerpo.ace.y = 0

    // MCUV
    cuerpo.velang += cuerpo.aceang * dt
    cuerpo.ang += cuerpo.velang * dt + 0.5 * cuerpo.aceang * dt * dt
}

function aplicarFuerza(cuerpo, fuerza) {
    // a = a + f/m
    cuerpo.ace = suma(cuerpo.ace, div(fuerza, cuerpo.masa))
}

function aplicarTorque(cuerpo, torque) {
    // aceang = aceang + torque / inercia
    cuerpo.aceang += torque / (cuerpo.masa * cuerpo.inercia)
}

function resolverColisionCirculoCirculo(A, B) {
    var diferencia = resta(A.pos, B.pos)
    var distancia = magnitud(diferencia)
    var sumaDeRadios = A.radio + B.radio
    if (distancia < sumaDeRadios) {
        var direccion = normalizado(diferencia)
        var solapamiento = sumaDeRadios - distancia
        var fuerza = mul(direccion, 1000 * solapamiento)
        aplicarFuerza(A, fuerza)
        aplicarFuerza(B, mul(fuerza, -1))
    }
}

function colisionCirculoCirculo(A, B) {
    var distancia = magnitud(resta(A.pos, B.pos))
    return distancia < A.radio + B.radio
}

function colisionCirculoRectangulo(circulo, rectangulo) {
    var aux = {x: circulo.pos.x, y: circulo.pos.y}

    if (aux.x < rectangulo.pos.x - rectangulo.w/2) {
        aux.x = rectangulo.pos.x - rectangulo.w/2
    }
    if (aux.y < rectangulo.pos.y - rectangulo.h/2) {
        aux.y = rectangulo.pos.y - rectangulo.h/2
    }
    if (aux.x > rectangulo.pos.x + rectangulo.w/2) {
        aux.x = rectangulo.pos.x + rectangulo.w/2
    }
    if (aux.y > rectangulo.pos.y + rectangulo.h/2) {
        aux.y = rectangulo.pos.y + rectangulo.h/2
    }

    var distancia = magnitud(resta(circulo.pos, aux))
    return distancia < circulo.radio
}

function resolverColisionRectangulo(circulo, rectangulo, restitucion) {
    var aux = {x: circulo.pos.x, y: circulo.pos.y}

    if (aux.x < rectangulo.pos.x - rectangulo.w/2) {
        aux.x = rectangulo.pos.x - rectangulo.w/2
    }
    if (aux.y < rectangulo.pos.y - rectangulo.h/2) {
        aux.y = rectangulo.pos.y - rectangulo.h/2
    }
    if (aux.x > rectangulo.pos.x + rectangulo.w/2) {
        aux.x = rectangulo.pos.x + rectangulo.w/2
    }
    if (aux.y > rectangulo.pos.y + rectangulo.h/2) {
        aux.y = rectangulo.pos.y + rectangulo.h/2
    }

    var diferencia = resta(circulo.pos, aux)
    // Calcular la normal
    var normal = normalizado(diferencia)
    var distancia = magnitud(diferencia)
    if (distancia < circulo.radio) {
        // Reflejar la velocidad
        circulo.vel = reflejado(circulo.vel, normal, restitucion)
        // Evitar el solapado
        circulo.pos = suma(aux, mul(normal, circulo.radio))
    }
}

function resolverColisionCapsula(circulo, capsula, restitucion) {
    var diferencia = resta(circulo.pos, capsula.pos1)
    var vecLinea = resta(capsula.pos2, capsula.pos1)
    var largoLinea = magnitud(vecLinea)
    var direccion = normalizado(vecLinea)
    var dot = escalar(diferencia, direccion)
    if (dot < 0) {
        dot = 0
    }
    if (dot > largoLinea) {
        dot = largoLinea
    }

    var punto = suma(capsula.pos1, mul(direccion, dot))

    if (colisionCirculoCirculo(circulo, {pos: punto, radio: capsula.radio})) {
        // Calcular la normal
        var normal = normalizado(resta(circulo.pos, punto))
        // Calcular punto de choque
        var puntoDeChoque = suma(punto, mul(normal, capsula.radio))
        // Calcular velocidad tangencial del punto
        var difAlPuntoDeChoque = resta(puntoDeChoque, capsula.pos)
        var distAlPuntoDeChoque = magnitud(difAlPuntoDeChoque)
        var magVelTan = capsula.velang * distAlPuntoDeChoque

        var dirTangencial = normalizado(difAlPuntoDeChoque)
        dirTangencial = {
            x: -dirTangencial.y,
            y: dirTangencial.x
        }
        var velTan = mul(dirTangencial, magVelTan)
        var velocidadTotal = suma(velTan, capsula.vel)

        // Reflejar la velocidad
        var velRelativa = resta(circulo.vel, velocidadTotal)
        velRelativa = reflejado(velRelativa, normal, restitucion)
        circulo.vel = suma(velRelativa, velocidadTotal)
        // Evitar el solapamiento
        circulo.pos = suma(punto, mul(normal, capsula.radio + circulo.radio))
    }
}


function ColisionCirculoCapsula(circulo, capsula){
    var diferencia = resta(circulo.pos, capsula.pos1)
    var vecLinea = resta(capsula.pos2, capsula.pos1)
    var largoLinea = magnitud(vecLinea)
    var direccion = normalizado(vecLinea)
    var dot =escalar(diferencia, direccion)
    if (dot<0){
        dot = 0
    }
    if (dot> largoLinea){
        dot = largoLinea
    }
    var punto = suma(capsula.pos1, mul(direccion, dot))

}

function reflejado(vector, n, restitucion) {
    var dot = -escalar(vector, n)
    var proy = mul(n, dot*(restitucion+1))
    return suma(vector, proy)
}

function escalar(a, b) {
    return a.x*b.x + a.y*b.y
}

function magnitud(vector) {
    return sqrt(vector.x*vector.x + vector.y*vector.y)
}

function normalizado(vector) {
    var magn = magnitud(vector)
    if (magn == 0) {
        return {
            x: 0,
            y: 0
        }
    }
    return {
        x: vector.x / magn,
        y: vector.y / magn
    }
}

function suma(v1, v2) {
    return {
        x: v1.x + v2.x,
        y: v1.y + v2.y
    }
}

function suma3(v1, v2, v3) {
    return {
        x: v1.x + v2.x + v3.x,
        y: v1.y + v2.y + v3.y
    }
}

function resta(v1, v2) {
    return {
        x: v1.x - v2.x,
        y: v1.y - v2.y
    }
}

function mul(vector, numero) {
    return {
        x: vector.x * numero,
        y: vector.y * numero
    }
}

function div(vector, numero) {
    return {
        x: vector.x / numero,
        y: vector.y / numero
    }
}