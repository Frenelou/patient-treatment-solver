const { processInput } = require('./inputs');
const { pipe, mostFrequentInArray } = require('./helpers');

export const maxNbrOfSatisfiedDoctors = ({ suggestionsList }) => {
    let suggestionsListWithMatches = suggestionsList.reduce((acc, curr, i) =>
        [...acc, getDoctorsMatches(suggestionsList, curr, i)], []);
    // New Suggestion list with, for each doctor, the list of conflicts and match with every doctor

    return pipe(conflictsWith, getMaxSatifiedCount)(suggestionsListWithMatches)
}

const conflictsWith = suggestions => {
    const sortedDoctors = [...suggestions].sort((a, b) => b.compatibleWith.matches.length - a.compatibleWith.matches.length) // Sort list by descending number of matches

    const doctorsConflictsForEachMatch = sortedDoctors[0].compatibleWith.matches.map(match =>
        ({
            id: match,
            conflicts: sortedDoctors.find(d => d.doctorId === match).compatibleWith.conflicts
        })
    ) // Take the doctor with most matches and list their conflicts for each of its matches

    return doctorsConflictsForEachMatch
}

const getMaxSatifiedCount = suggestions => {
    let doctors = [...suggestions];

    while (true) {

        let allConflicts = doctors.reduce((acc, curr) => [...acc, ...curr.conflicts], [])
        // A list of all conflicts that the doctor's matches have with the rest

        let mostRecurringConflict = mostFrequentInArray(allConflicts)

        doctors = doctors.filter(e => e.id !== mostRecurringConflict);
        removeConflictFromArray(doctors, mostRecurringConflict)

        if (allConflicts.length === new Set(allConflicts).size) { // Final check if there are no more dupplicates in conflicts list

            let conflictsLeftCount = doctors.filter(f => allConflicts.includes(f.id)
                && f.conflicts[0] !== undefined).length;// Look for doctors who still have conflicts

            if (conflictsLeftCount > 0) {
                /* If there are still conflicted doctors, it mean there is 1 last conflict. 
                Since any doctor left in the conflict have only one conflict and that one conficted doctor's conflict will match its id, we remove both doctors to get the final number of satified doctors */
                doctors = doctors.slice(0, doctors.length - 2)
            }
            break
        }
        if (allConflicts.length === 1) break // Stop if there are no conflicts
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
const hasConflicts = (treats, leaves, suggestionsTreat, suggestionLeave) =>
    treats.some(p => suggestionLeave.includes(p)) || leaves.some(p => suggestionsTreat.includes(p))

export const getResult = input => pipe(processInput, maxNbrOfSatisfiedDoctors)(input)



