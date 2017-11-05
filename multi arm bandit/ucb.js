"use strict"

/**
 * UCB1 algorithm
 * https://en.wikipedia.org/wiki/Multi-armed_bandit#Online_linear_classifier
 * 
 * @param {*} won number of won case
 * @param {*} tested tested number of this arm
 * @param {*} total total tested number of arms
 */
const ucb1 = (won, tested, total) => (won / tested) + Math.sqrt(2 * Math.log10(total / tested));
const arm1 = () => Math.random() < 0.5 ? 1 : 0
const arm2 = () => Math.random() < 0.8 ? 1 : 0

const arms = [arm1, arm2];
const results = [[],[]];
const totalTestNumber = 10000;

for (let i = 0;i < totalTestNumber;i++) {
    if (i < arms.length) {
        let res = arms[i]();
        results[i].push(res);
    } else {
        let useArm = 0;
        let maxUcb = Number.MIN_VALUE;
        let ucbSet = [];
        for (let j = 0;j < results.length;j++) {
            let ucb = ucb1(
                results[j].filter(i => i === 1).length,
                results[j].length,
                i
            );
            ucbSet.push(ucb);
            if (maxUcb < ucb) {
                useArm = j;
                maxUcb = ucb;
            }
        }
        // console.log(ucbSet);
        let res = arms[useArm]();
        results[useArm].push(res);
    }
}

// console.log(results);
let totalWon = 0;
for (let i = 0;i < results.length;i++) {
    let won = results[i].filter(j => j === 1).length;
    totalWon += won;
    console.log(i, (won / results[i].length).toFixed(2));
}
console.log("won rate", totalWon / totalTestNumber);