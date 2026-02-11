//2.Validador CI/CD para despliegues
const fs = require('fs');

function solve() {


    const buffer = fs.readFileSync(0);
    let pos = 0;

    function nextToken() {
        while (pos < buffer.length && buffer[pos] <= 32) pos++;
        if (pos >= buffer.length) return null;
        let start = pos;
        while (pos < buffer.length && buffer[pos] > 32) pos++;
        return buffer.toString('utf8', start, pos);
    }

    const nStr = nextToken();
    const qStr = nextToken();
    if (!nStr || !qStr) return;

    const N = parseInt(nStr);
    const Q = parseInt(qStr);

    const adj = Array.from({ length: N + 1 }, () => new Set());
    let results = [];

    for (let i = 0; i < Q; i++) {
        const type = nextToken();
        if (type === 'A') {
            adj[parseInt(nextToken())].add(parseInt(nextToken()));
        } else if (type === 'R') {
            adj[parseInt(nextToken())].delete(parseInt(nextToken()));
        } else if (type === 'D') {
            const startNode = parseInt(nextToken());
            
            //evitar Stack Overflow y detectar ciclos
            const visited = new Set();
            const recStack = new Set();
            const stack = [[startNode, false]]; // [nodo, procesado]
            let hasCycle = false;

            while (stack.length > 0) {
                const [u, processed] = stack[stack.length - 1];

                if (!processed) {
                    if (recStack.has(u)) {
                        hasCycle = true;
                        break;
                    }
                    if (visited.has(u)) {
                        stack.pop();
                        continue;
                    }

                    visited.add(u);
                    recStack.add(u);
                    stack[stack.length - 1][1] = true;

                    for (const v of adj[u]) {
                        stack.push([v, false]);
                    }
                } else {
                    recStack.delete(u);
                    stack.pop();
                }
            }

            results.push(hasCycle ? "-1" : visited.size.toString());
        }
    }

    process.stdout.write(results.join('\n'));
}

solve();