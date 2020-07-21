const shuffleArray = arr => arr
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

module.exports = { pipe, shuffleArray }