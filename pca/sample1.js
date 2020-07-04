'use strict'

const inputs =
`
4.62	3.52	2.31	4.07
4.29	4.51	4.29	4.18
2.31	1.32	4.95	2.75
1.32	5.39	2.53	5.28
5.39	4.18	5.5	4.18
1.76	3.41	2.09	2.2
3.3	3.85	2.42	3.74
1.43	1.76	5.17	1.87
4.4	4.29	4.07	4.18
3.52	4.51	3.85	4.73
5.28	4.4	2.97	1.87
`;

function normalizeWeights(weights, target) {
    const num = weights.length;
    let sq = 0.0;
    target = parseFloat(target);
    for (let i = 0;i < num;i++) {
        sq += weights[i] * weights[i];
    }
    let ratio = Math.sqrt(target / sq);
    return weights.map(w => w * ratio);
}

function product(w1, w2)  {
    let sum = 0.0;
    for (let i = 0;i < w2.length;i++) {
        sum += w1[i] * w2[i];
    }
    return sum;
}

function variance(ary) {
    let sum = 0.0;

    for (let i = 0;i < ary.length;i++) {
        sum += ary[i];
    }
    let mean = sum / ary.length;

    let devsq = 0.0;
    for (let i = 0;i < ary.length;i++) {
        let diff = ary[i] - mean;
        devsq += diff * diff;
    }
    return devsq / ary.length;
}

let allData = inputs.trim().split("\n").map(line => line.split("\t").map(cell => parseFloat(cell)));
// console.log(allData);

let weights1 = normalizeWeights([1, 1, 1, 1], 1);
console.log(weights1);

// let w00 = [];
//
// for (let row of allData) {
//     w00.push(product(weights1, row))
// }
// console.log(w00);
// console.log(variance(w00));

const pf = 0.001;
const sr = 0.1;
for (let i = 0;i < 100;i++) {
    for (let j = 0;j < weights1.length;j++) {
        let oldVal = weights1[j];
        let newVal = oldVal + pf;

        let w00 = [];
        for (let row of allData) {
            w00.push(product(weights1, row))
        }
        let beforeVar = variance(w00);

        weights1[j] = newVal;
        w00 = [];
        for (let row of allData) {
            w00.push(product(weights1, row))
        }
        let afterVar = variance(w00);

        weights1[j] += (afterVar - beforeVar) / pf * sr;
    }
    weights1 = normalizeWeights(weights1, 1);

    let w01 = [];
    for (let row of allData) {
        w01.push(product(weights1, row))
    }
    console.log(variance(w01));
}
console.log(weights1);