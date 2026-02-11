//4. Control de Peajes del Altiplano 
const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0);
    let offset = 0;

    //Lector de tokens para manejar cadenas y numeros
    function nextToken() {
        while (offset < input.length && input[offset] <= 32) offset++;
        if (offset >= input.length) return null;
        let start = offset;
        while (offset < input.length && input[offset] > 32) offset++;
        return input.toString('utf-8', start, offset);
    }

    const nStr = nextToken();
    if (nStr === null) return;
    const N = parseInt(nStr);

    let totalRecaudado = 0n;
    const rutasMoney = new Map();     // Ruta -> Monto
    const vehiculosRutas = new Map(); // Placa -> Set(Rutas)
    const vehiculosMoney = new Map(); // Placa -> Monto

    for (let i = 0; i < N; i++) {
        const ruta = nextToken();
        const placa = nextToken();
        const montoStr = nextToken();
        if (!montoStr) break;
        
        const monto = BigInt(montoStr);

        // 1Total Global
        totalRecaudado += monto;

        // 2 Por Ruta
        rutasMoney.set(ruta, (rutasMoney.get(ruta) || 0n) + monto);

        // 3 Vehículos y sus rutas
        if (!vehiculosRutas.has(placa)) {
            vehiculosRutas.set(placa, new Set());
        }
        vehiculosRutas.get(placa).add(ruta);

        // 4. Por Vehículo
        vehiculosMoney.set(placa, (vehiculosMoney.get(placa) || 0n) + monto);
    }

    // Resultados ---

    // Ruta con mayor recaudacipn
    let maxRuta = "";
    let maxRutaMoney = -1n;
    for (const [ruta, money] of rutasMoney) {
        if (money > maxRutaMoney) {
            maxRutaMoney = money;
            maxRuta = ruta;
        }
    }

    // Vehiculos en mas de una ruta
    let vehiculosMultiRuta = 0;
    for (const [placa, rutas] of vehiculosRutas) {
        if (rutas.size > 1) {
            vehiculosMultiRuta++;
        }
    }
    // Vehculo que mas pago
    let maxPlaca = "";
    let maxPlacaMoney = -1n;
    for (const [placa, money] of vehiculosMoney) {
        if (money > maxPlacaMoney) {
            maxPlacaMoney = money;
            maxPlaca = placa;
        }
    }
    // Salida final
    process.stdout.write(totalRecaudado.toString() + "\n");
    process.stdout.write(maxRuta + "\n");
    process.stdout.write(vehiculosMultiRuta.toString() + "\n");
    process.stdout.write(maxPlaca + "\n");
}
solve();