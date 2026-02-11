//1.Torres de Lego con Energia de Reconfiguracion

const fs = require('fs');

function solve() {
    // Leemos el buffer de entrada directamente
    const buffer = fs.readFileSync(0);
    let pos = 0;

    // Funciion para leer numeros directamente del Buffer sin convertirlos a String
    function nextBigInt() {
        // Saltar caracteres no numericos
        while (pos < buffer.length && (buffer[pos] < 48 || buffer[pos] > 57)) {
            pos++;
        }
        if (pos >= buffer.length) return null;

        let res = 0n;
        while (pos < buffer.length && buffer[pos] >= 48 && buffer[pos] <= 57) {
            res = res * 10n + BigInt(buffer[pos] - 48);
            pos++;
        }
        return res;
    }

    // Leemos N y E
    const nBig = nextBigInt();
    const E = nextBigInt();
    
    if (nBig === null) return;
    const N = Number(nBig);

    // Primera torre
    let currentHeight = nextBigInt();
    let energyUsed = 0n;
    let possible = true;

    // Procesar el resto de torres
    for (let i = 1; i < N; i++) {
        let nextHeight = nextBigInt();
        
        if (nextHeight > currentHeight) {
            energyUsed += (nextHeight - currentHeight);
            // a altura de la torre i se reduce a la altura de la torre i-1
            // Por currentHeight no cambia.
        } else {
            // a torre i ya es menor o igua actualizamos la referencia
            currentHeight = nextHeight;
        }

        if (energyUsed > E) {
            possible = false;
            break;
        }
    }

    // evitar el PE
    process.stdout.write(possible ? "Valida" : "Invalida");
}

solve();