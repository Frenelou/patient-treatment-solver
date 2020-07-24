const shuffleArray = arr => arr
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const mostFrequentInArray = arr => {
    let counts = arr.reduce((a, c) => {
        a[c] = (a[c] || 0) + 1;
        return a;
    }, {});
    const maxCount = Math.max(...Object.values(counts));
    return Number(Object.keys(counts).filter(k => counts[k] === maxCount)[0])
}

module.exports = { pipe, shuffleArray, mostFrequentInArray }