const { processInput } = require('./inputs');
const { pipe, mostFrequentInArray } = require('./helpers');

const maxNbrOfSatisfiedDoctors = ({ suggestionsList }) => {
    const doctorsListWithMatches = suggestionsList.reduce((acc, curr, i) =>
        [...acc, getDoctorsMatchesAndConflicts(suggestionsList, curr, i)], []);
    // New Suggestion list with, for each doctor their matches and conflicts 

    return getMaxSatifiedCount(doctorsListWithMatches)
}

const getMaxSatifiedCount = doctors => {
    while (true) {
        let allConflicts = doctors.reduce((acc, curr) => [...acc, ...curr.conflicts], [])
        let mostFrequentConflict = mostFrequentInArray(allConflicts)

        doctors = doctors.filter(e => e.id !== mostFrequentConflict);

        removeConflictFromArray(doctors, mostFrequentConflict)
        if (allConflicts.length === 0) break // Stop if there are no conflicts
    }
    return doctors.length;
}

const removeConflictFromArray = (array, number) => array.filter(c => {
    const index = c.conflicts.indexOf(number);
    if (index > -1) {
        c.conflicts.splice(index, 1);
    }
    return c
})

const getDoctorsMatchesAndConflicts = (suggestionsList, currentDoctor, id) => {
    const matchesAndConflicts = suggestionsList.reduce((acc, curr, index) => {
        const { treats, leaves } = curr;
        const isConflicted = hasConflicts(treats, leaves, currentDoctor.treats, currentDoctor.leaves);
        return ({
            ...acc,
            matches: !isConflicted ? [...acc.matches, index] : [...acc.matches],
            conflicts: isConflicted ? [...acc.conflicts, index] : [...acc.conflicts]
        })
    }, {
        matches: [id],
        conflicts: []
    })
    matchesAndConflicts.matches = [...new Set(matchesAndConflicts.matches)]
    matchesAndConflicts.conflicts = [...new Set(matchesAndConflicts.conflicts)]

    return ({ id: id, matches: matchesAndConflicts.matches, conflicts: matchesAndConflicts.conflicts })
}
const hasConflicts = (treats, leaves, suggestionsTreat, suggestionLeave) =>
    treats.some(p => suggestionLeave.includes(p)) || leaves.some(p => suggestionsTreat.includes(p))

export const getResult = input => pipe(processInput, maxNbrOfSatisfiedDoctors)(input)



