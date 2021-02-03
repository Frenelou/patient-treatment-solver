require('util').inspect.defaultOptions.depth = null
const { inputPrompt, getInput, processInput } = require('./inputs');
const { pipe, mostFrequentInArray } = require('./helpers');

const maxNbrOfSatisfiedDoctors = ({ suggestionsList }) => {
    const doctorsListWithConflicts = suggestionsList.reduce((acc, curr, i) =>
        [...acc, listDoctorsWithConflicts(suggestionsList, curr, i)], []);
    // New Suggestion list with, for each doctor their matches and conflicts 
    return getMaxSatisfiedCount(doctorsListWithConflicts)
}

const listDoctorsWithConflicts = (suggestions, currentDoctor, id) => {
    const currentDoctorWithConflicts = suggestions.reduce((acc, curr, index) => {
        const { treats, leaves } = curr;
        const isConflicted = treats.some(p => currentDoctor.leaves.includes(p)) || leaves.some(p => currentDoctor.treats.includes(p))
        return ({
            ...acc,
            conflicts: isConflicted ? [...acc.conflicts, index] : [...acc.conflicts]
        })
    }, { id: id, ...currentDoctor, conflicts: [] })
    return ({ ...currentDoctorWithConflicts, numberOfConflicts: currentDoctorWithConflicts.conflicts.length })
}

const getMaxSatisfiedCount = suggestionsList => {
    while (true) {
        let allConflicts = suggestionsList.reduce((acc, curr) => [...acc, ...curr.conflicts], [])
        if (allConflicts.length === 0) break // Stop if there are no more conflicts

        const mostFrequentConflicts = mostFrequentInArray(allConflicts)
        const mostFrequentConflictsStillinlist = suggestionsList
            .filter(d => mostFrequentConflicts.map(c => c.id).includes(d.id))
            .sort((a, b) => b.numberOfConflicts - a.numberOfConflicts)
        const mostFrequentConflict = mostFrequentConflictsStillinlist[0].id // Get most frequent conflict that has most conflicts with others
        if (mostFrequentConflicts.length > 2 && mostFrequentConflicts[0].count === 1) {
            suggestionsList = suggestionsList.splice(0, mostFrequentConflicts.length / 2)
            break
        }


        suggestionsList = suggestionsList.filter(e => e.id !== mostFrequentConflict); // Remove most frequent doctor in conflicts
        removeConflictFromArray(suggestionsList, mostFrequentConflict) // Also remove it from doctor's conflicts
    }
    return suggestionsList.length;
}
const removeConflictFromArray = (array, number) => array.map(c => {
    const index = c.conflicts.indexOf(number);
    if (index > -1) {
        c.conflicts.splice(index, 1);
    }
    return c
})

const askInputfromCmd = () => inputPrompt(pipe(getInput, maxNbrOfSatisfiedDoctors, console.log))
// askInputfromCmd()

const autoLaunchInput = a => pipe(getInput, maxNbrOfSatisfiedDoctors)(a)
const basePath = '../test_input_files/';

const input6 = autoLaunchInput(`${basePath}input6.txt`)
console.log(`${input6} should be 4`);

const input1 = autoLaunchInput(`${basePath}input1.txt`)
console.log(`${input1} should be 3`);

const input2 = autoLaunchInput(`${basePath}input2.txt`)
console.log(`${input2} should be 6`);

const input3 = autoLaunchInput(`${basePath}input3.txt`)
console.log(`${input3} should be 11`);

const input4 = autoLaunchInput(`${basePath}input4.txt`)
console.log(`${input4} should be 20`);

const input5 = autoLaunchInput(`${basePath}input5.txt`)
console.log(`${input5} should be 18`);

const input10 = autoLaunchInput(`${basePath}input10.txt`)
console.log(`${input10} should be 16`);