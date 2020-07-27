const { processInput } = require('./inputs');
const { pipe, mostFrequentInArray } = require('./helpers');

const maxNbrOfSatisfiedDoctors = ({ suggestionsList }) => {
    const doctorsListWithMatches = suggestionsList.reduce((acc, curr, i) =>
        [...acc, listDoctorsWithConflicts(suggestionsList, curr, i)], []);
    // New Suggestion list with, for each doctor their matches and conflicts 

    return getMaxSatisfiedCount(doctorsListWithMatches)
}

const listDoctorsWithConflicts = (suggestions, currentDoctor, id) => suggestions.reduce((acc, curr, index) => {
    const { treats, leaves } = curr;
    const isConflicted = treats.some(p => currentDoctor.leaves.includes(p)) || leaves.some(p => currentDoctor.treats.includes(p))
    return ({
        ...acc,
        conflicts: isConflicted ? [...acc.conflicts, index] : [...acc.conflicts]
    })
}, { id: id, ...currentDoctor, conflicts: [] })

const getMaxSatisfiedCount = suggestionsList => {
    let suggestions = JSON.parse(JSON.stringify(suggestionsList));

    while (true) {
        let allConflicts = suggestions.reduce((acc, curr) => [...acc, ...curr.conflicts], [])
        if (allConflicts.length === 0) break // Stop if there are no more conflicts

        const mostFrequentConflicts = mostFrequentInArray(allConflicts).map(c => c.id)
        const mostFrequentConflict = JSON.parse(JSON.stringify(suggestionsList))
            .filter(d => mostFrequentConflicts.includes(d.id))
            .sort((a, b) => b.conflicts.length - a.conflicts.length)[0].id
        // Get most frequent conflict that has most conflicts with others
        
        suggestions = suggestions.filter(e => e.id !== mostFrequentConflict); // Remove most frequent doctor in conflicts
        removeConflictFromArray(suggestions, mostFrequentConflict) // Also remove it from doctor's conflicts
    }
    return suggestions.length;
}

const removeConflictFromArray = (array, number) => array.filter(c => {
    const index = c.conflicts.indexOf(number);
    if (index > -1) {
        c.conflicts.splice(index, 1);
    }
    return c
})

export const getResult = input => pipe(processInput, maxNbrOfSatisfiedDoctors)(input)



