require('util').inspect.defaultOptions.depth = null
const { inputPrompt, getInput, processInput } = require('./inputs');
const { pipe, mostFrequentInArray } = require('./helpers');

const maxNbrOfSatisfiedDoctors = ({ suggestionsList }) => {
    let suggestionsListWithMatches = suggestionsList.reduce((acc, curr, i) =>
        [...acc, getDoctorsMatches(suggestionsList, curr, i)], []);
    // New Suggestion list with, for each doctor, the list of conflicts and match with every doctor

    return pipe(conflictsWith, getMaxSatifiedCount)(suggestionsListWithMatches)
}

const conflictsWith = suggestions => {
    const sortedDoctors = [...suggestions].sort((a, b) => b.compatibleWith.matches.length - a.compatibleWith.matches.length)
    // Sort list by descending number of matches

    const doctorsConflictsForEachMatch = sortedDoctors[0].compatibleWith.matches.map(match =>
        ({
            id: match,
            conflicts: sortedDoctors.find(d => d.doctorId === match).compatibleWith.conflicts
        })
    ) // Take the doctor with most matches and list their conflicts for each of its matches

    return doctorsConflictsForEachMatch
}

const getMaxSatifiedCount = suggestions => {
    let doctors = [...suggestions]; // A clone of the suggestions list where we can remove doctors as we go
    while (true) {
        let allConflicts = doctors.reduce((acc, curr) => [...acc, ...curr.conflicts], [])
        // A list of all conflicts that the doctor's matches have with the rest

        let mostRecurringConflict = mostFrequentInArray(allConflicts)

        doctors = doctors.filter(e => e.id !== mostRecurringConflict);
        removeConflictFromArray(doctors, mostRecurringConflict)

        allConflicts.filter(c => c !== mostRecurringConflict) // Remove most occurring conflict from list of conflicts once doctor has been eliminated

        if (allConflicts.length === new Set(allConflicts).size) { // If there are no duplicates in allConflicts list
            let conflictsLeftCount = doctors.filter(f => allConflicts.includes(f.id)
                && f.conflicts[0] !== undefined).length;
            // Get number of doctors who actually still have conflicts

            if (conflictsLeftCount > 0) {  // If Several doctors still have conflicts
                let nbrOfConflictsToRemove = allConflicts.length - conflictsLeftCount;
                doctors = doctors.slice(0, doctors.length - nbrOfConflictsToRemove)
            }
            break
        }
        if (allConflicts.length === 1) break // Stop if there are no conflicts
    }

    return doctors.length;
}
const removeConflictFromArray = (array, number) => array.map(c => {
    const index = c.conflicts.indexOf(number);
    if (index > -1) {
        c.conflicts.splice(index, 1);
    }
    return c
})

const getDoctorsMatches = (suggestionsList, currentDoctor, id) => {
    const compatibleWith = suggestionsList.reduce((acc, curr, index) => {
        const { treats, leaves } = curr;
        const isConflicted = hasConflicts(treats, leaves, currentDoctor.treats, currentDoctor.leaves);
        // Check doctor's suggestions against current combination and add them if none
        return ({
            ...acc,
            matches: !isConflicted ? [...acc.matches, index] : [...acc.matches],
            conflicts: isConflicted ? [...acc.conflicts, index] : [...acc.conflicts]
        })
    }, {
        matches: [id],
        conflicts: []
    })
    compatibleWith.matches = [...new Set(compatibleWith.matches)]
    compatibleWith.conflicts = [...new Set(compatibleWith.conflicts)]

    return ({ doctorId: id, compatibleWith })
}
const hasConflicts = (treats, leaves, suggestionsTreat, suggestionLeave) => treats.some(p => suggestionLeave.includes(p)) || leaves.some(p => suggestionsTreat.includes(p))


module.exports = {
    maxNbrOfSatisfiedDoctors
}


const askInputfromCmd = () => inputPrompt(pipe(getInput, maxNbrOfSatisfiedDoctors, console.log))

askInputfromCmd()


const autoLaunchInput = a => pipe(getInput, maxNbrOfSatisfiedDoctors)(a)
const basePath = '../test_input_files/';

const input1 = autoLaunchInput(`${basePath}input1.txt`)
console.log(`${input1} should be 3`);

const input2 = autoLaunchInput(`${basePath}input2.txt`)
console.log(`${input2} should be 6`);

const input3 = autoLaunchInput(`${basePath}input3.txt`)
console.log(`${input3} should be 11`);

// const input4 = autoLaunchInput(`${basePath}input4.txt`)
// console.log(`${input4} should be 20`);

const input5 = autoLaunchInput(`${basePath}input5.txt`)
console.log(`${input5} should be 18`);

// const input10 = autoLaunchInput(`${basePath}input10.txt`)
// console.log(`${input10} should be 16`);
