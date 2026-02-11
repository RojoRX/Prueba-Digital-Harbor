//3.Digital Harbor Team Olympiad
const fs = require('fs');
function solve() {

    const input = fs.readFileSync(0);
    let offset = 0;

    function nextInt() {
        while (offset < input.length && (input[offset] < 48 || input[offset] > 57)) {
            offset++;
        }
        if (offset >= input.length) return null;
        let res = 0;
        while (offset < input.length && input[offset] >= 48 && input[offset] <= 57) {
            res = res * 10 + (input[offset] - 48);
            offset++;
        }
        return res;
    }

    const n = nextInt();
    if (n === null) return;

    // Listas almacenar los índices de cada tipo de habilidad
    const programmers = []; // Tipo1
    const mathematicians = []; // Tipo 2
    const peSpecialists = []; // Tipo3

    for (let i = 1; i <= n; i++) {
        const skill = nextInt();
        if (skill === 1) programmers.push(i);
        else if (skill === 2) mathematicians.push(i);
        else if (skill === 3) peSpecialists.push(i);
    }
    // El numero maximo de equipos es el minimo de las longitudes de las 3listas
    const w = Math.min(programmers.length, mathematicians.length, peSpecialists.length);

    // Si no hay equipos solo imprimimos 0
    if (w === 0) {
        process.stdout.write("0\n");
        return;
    }

    // Construimos la salida
    let output = w + "\n";
    for (let i = 0; i < w; i++) {
        output += `${programmers[i]} ${mathematicians[i]} ${peSpecialists[i]}\n`;
    }
    process.stdout.write(output);
}
solve();