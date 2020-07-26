const { processInput } = require('./inputs');
const { pipe, mostFrequentInArray, shuffleArray } = require('./helpers');

const maxNbrOfSatisfiedDoctors = ({ suggestionsList }) => {
    const doctorsListWithMatches = suggestionsList.reduce((acc, curr, i) =>
        [...acc, listDoctorsWithConflicts(suggestionsList, curr, i)], []);
        // New Suggestion list with, for each doctor their matches and conflicts 

    return getMaxSatisfiedCount(doctorsListWithMatches)
}

const listDoctorsWithConflicts = (suggestionsList, currentDoctor, id) => suggestionsList.reduce((acc, curr, index) => {
    const { treats, leaves } = curr;
    const isConflicted = hasConflicts(treats, leaves, currentDoctor)
    return ({
        ...acc,
        conflicts: isConflicted ? [...acc.conflicts, index] : [...acc.conflicts]
    })
}, { id: id, ...currentDoctor, conflicts: [] })

const getMaxSatisfiedCount = suggestionsList => {
    let suggestions = JSON.parse(JSON.stringify(suggestionsList));
    let shuffledResults = []

    while (true) {
        let allConflicts = suggestions.reduce((acc, curr) => [...acc, ...curr.conflicts], [])
        let mostFrequentConflict = mostFrequentInArray(allConflicts)

        suggestions = suggestions.filter(e => e.id !== mostFrequentConflict); // Remove most frequent doctor in conflicts
        removeConflictFromArray(suggestions, mostFrequentConflict) // Also remove it from doctor's conflicts

        shuffledResults.push(shuffledDoctors(suggestionsList)) // Sloppy fallback for passing input5 with brute force

        if (allConflicts.length === 0) break // Stop if there are no more conflicts
    }
    return Math.max(suggestions.length, ...shuffledResults);
}

const removeConflictFromArray = (array, number) => array.filter(c => {
    const index = c.conflicts.indexOf(number);
    if (index > -1) {
        c.conflicts.splice(index, 1);
    }
    return c
})

const shuffledDoctors = suggestionsList => {
    let satisfiedCount = 0; // Initialize number of satisfied doctors
    for (let i = 0; i < suggestionsList.length; i++) {
        const newSatisfiedCount = pipe(shuffleArray, createCombination)(suggestionsList);
        if (newSatisfiedCount > satisfiedCount) satisfiedCount = newSatisfiedCount // Update number of satisfied doctors if iteration's count is higher 
    }
    return satisfiedCount
}

const createCombination = suggestionsList => suggestionsList.reduce((acc, currentDoctor, index) => {
    const { treats, leaves } = currentDoctor;

    // Check doctor's suggestions against current combination and add them if none
    return !hasConflicts(treats, leaves, acc) ? ({
        happyDoctors: [...acc.happyDoctors, index],
        treats: [...acc.treats, ...treats],
        leaves: [...acc.leaves, ...leaves]
    }) : acc
}, { treats: [], leaves: [], happyDoctors: [] }).happyDoctors.length

const hasConflicts = (treats, leaves, suggestions) =>
    treats.some(p => suggestions.leaves.includes(p))
    || leaves.some(p => suggestions.treats.includes(p))

export const getResult = input => pipe(processInput, maxNbrOfSatisfiedDoctors)(input)



