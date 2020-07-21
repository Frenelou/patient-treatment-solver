const { processInput } = require('./inputs');
const { pipe, shuffleArray } = require('./helpers');

const maxNbrOfSatisfiedDoctors = ({ suggestionsList, nDoctors }) => {
    let satisfiedCount = 0; // Initialize number of satisfied doctors
    for (let i = 0; i < nDoctors * nDoctors; i++) {
        const newSatisfiedCount = pipe(shuffleArray, createCombination)(suggestionsList);
        satisfiedCount = newSatisfiedCount < satisfiedCount
            ? satisfiedCount : newSatisfiedCount // Update number of satisfied doctors if iteration's count is higher 
    }
    return satisfiedCount
}

const createCombination = suggestionsList =>
    suggestionsList.reduce((acc, currentDoctor, index) => {
        const { treats, leaves } = currentDoctor;

        // Check doctor's suggestions against current combination and add them if mo conflicts
        return !hasConflicts(treats, leaves, acc) ? ({
            happyDoctors: [...acc.happyDoctors, index],
            treats: [...acc.treats, ...treats],
            leaves: [...acc.leaves, ...leaves]
        }) : acc
    }, { treats: [], leaves: [], happyDoctors: [] }).happyDoctors.length

const hasConflicts = (treats, leaves, suggestions) =>
    treats.some(p => suggestions.leaves.includes(p))
    || leaves.some(p => suggestions.treats.includes(p))


const getResult = input => pipe(processInput, maxNbrOfSatisfiedDoctors)(input)

module.exports = { maxNbrOfSatisfiedDoctors, getResult }


