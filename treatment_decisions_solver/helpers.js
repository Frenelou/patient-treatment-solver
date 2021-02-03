const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const mostFrequentInArray = arr => {
    let counts = arr.reduce((a, c) => {
        a[c] = (a[c] || 0) + 1;
        return a;
    }, {});
    const highest = Object.keys(counts).map(k => ({ id: Number(k), count: counts[k] })).sort((a, b) => b.count - a.count)
    const tops = highest.filter(n => n.count === highest[0].count)
    return tops
}

module.exports = { pipe, mostFrequentInArray }