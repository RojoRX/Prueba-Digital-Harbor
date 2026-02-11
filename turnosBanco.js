//5.Sistema de turnos en Banco
const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0);
    let offset = 0;

    function nextToken() {
        while (offset < input.length && input[offset] <= 32) offset++;
        if (offset >= input.length) return null;
        let start = offset;
        while (offset < input.length && input[offset] > 32) offset++;
        return input.toString('utf-8', start, offset);
    }

    const nStr = nextToken();
    if (!nStr) return;
    const N = parseInt(nStr);

    const clientes = [];
    for (let i = 0; i < N; i++) {
        clientes.push({
            minuto: parseInt(nextToken()),
            tipo: nextToken()
        });
    }

    // Colas por tipo
    const colas = { 'V': [], 'J': [], 'C': [], 'S': [] };
    let c1Libre = 0; // Disp Caja 1
    let c2Libre = 0; // Disp Caja 2
    let clientesProcesados = 0;
    let clock = 0;
    let ptr = 0;

    // Simulaciin minuto a minuto o por eventos
    while (clientesProcesados < N) {
        // 1Llegada de clientes al minuto actual
        while (ptr < N && clientes[ptr].minuto <= clock) {
            colas[clientes[ptr].tipo].push(clientes[ptr].minuto);
            ptr++;
        }

        // 2Intentar asignar a caja 2 (Solo S mas rapido)
        if (clock >= c2Libre && colas['S'].length > 0) {
            colas['S'].shift();
            c2Libre = clock + 2;
            clientesProcesados++;
        }

        // 3Intentar asignar a caja 1
        if (clock >= c1Libre) {
            let clienteAsignado = null;
            
            // Pr ioridad estricta V, J, C
            if (colas['V'].length > 0) clienteAsignado = 'V';
            else if (colas['J'].length > 0) clienteAsignado = 'J';
            else if (colas['C'].length > 0) clienteAsignado = 'C';
            //Regla de excepcion para S en Caja 1
            else if (colas['S'].length > 0) {
                const espera = clock - colas['S'][0];
                if (espera > 10) clienteAsignado = 'S';
            }

            if (clienteAsignado) {
                colas[clienteAsignado].shift();
                c1Libre = clock + 5;
                clientesProcesados++;
            }
        }

        // Avanzar el relojpara no iterar infinitamente
        if (ptr < N && colas['V'].length === 0 && colas['J'].length === 0 && 
            colas['C'].length === 0 && colas['S'].length === 0 && clock < clientes[ptr].minuto) {
            clock = clientes[ptr].minuto;
        } else {
            clock++;
        }
    }
    console.log(Math.max(c1Libre, c2Libre));
}

solve();