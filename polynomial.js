const fs = require('fs');


function decodeValue(value, base) {
    return BigInt(parseInt(value, parseInt(base)));
}


function findConstantTerm(roots) {
 
    let c = 0; 

 
    for (const y of Object.values(roots)) {
        c += Number(y); 
    }
    return c;
}

function processTestCase(testCase) {
    const roots = {};
    const { n, k } = testCase.keys;

    for (const [key, value] of Object.entries(testCase)) {
        if (key !== 'keys') {
            const base = value.base;
            const decodedValue = decodeValue(value.value, base);
            roots[key] = decodedValue;
        }
    }

    const constantTerm = findConstantTerm(roots);
    return constantTerm;
}

const testCases = ['test_case_1.json', 'test_case_2.json'];
const results = [];

testCases.forEach(file => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${file}:`, err);
            return;
        }
        const testCase = JSON.parse(data);
        const constantTerm = processTestCase(testCase);
        results.push(`Constant term (c) for ${file}: ${constantTerm}`);
        if (results.length === testCases.length) {
            console.log(results.join('\n'));
        }
    });
});
