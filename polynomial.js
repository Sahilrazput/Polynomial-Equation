const fs = require('fs');
function decodeValue(base, value) {
    return BigInt(parseInt(value, base));
}
function lagrangeInterpolation(xValues, yValues, x) {
    let total = BigInt(0);
    const k = xValues.length;

    for (let i = 0; i < k; i++) {
        let xi = xValues[i];
        let yi = yValues[i];
        let term = yi;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= (BigInt(x) - BigInt(xi)) / (BigInt(xi) - BigInt(xValues[j]));
            }
        }
        total += term;
    }
    return total;
}
function findConstantTerm(roots) {
    const xValues = [];
    const yValues = [];

    for (const key in roots) {
        if (key !== 'keys') {
            const base = parseInt(roots[key].base);
            const value = roots[key].value;
            const x = parseInt(key);
            const y = decodeValue(base, value);
            xValues.push(x);
            yValues.push(y);
            console.log(`Decoded (x, y): (${x}, ${y})`); 
        }
    }

    const k = roots.keys.k;
    const xUsed = xValues.slice(0, k);
    const yUsed = yValues.slice(0, k);
    console.log("Using points:", xUsed, yUsed); 
    return lagrangeInterpolation(xUsed, yUsed, 0).toString();
}
fs.readFile('input.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const roots = JSON.parse(data);
    const constantTerm = findConstantTerm(roots);
    console.log("Constant term (c):", constantTerm);
});
