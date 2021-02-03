const fs = require('fs');

const getInput = filepath => {
    const data = fs.readFileSync(filepath, 'utf8');
    return processInput(data);
};

const processInput = input => { // Extract number of doctors and an array of their suggestions
    const inputData = input.split('\n'),
        nDoctors = Number(inputData[0]),
        suggestionsList = inputData.slice(2).filter(e => e.includes('#')).map(doctor => {
            let arr = doctor.split('#');
            return ({
                treats: arr[0] !== '' ? arr[0].trim().split(' ').map(Number) : [],
                leaves: arr[1] !== '' ? arr[1].trim().split(' ').map(Number) : []
            })
        })
    return ({ suggestionsList, nDoctors })
}

const inputPrompt = callback => { // Allows adding input from command line 
    prompt({
        type: 'input',
        name: 'filepath',
        message: 'Enter input path',
        result: answer => answer.trim(),
        validate: answer => {
            const regex = /(.)+(\.txt$)/;
            const isValid = regex.test(answer)
            return isValid ? true : 'Input must be a *.txt file'
        }
    })
        .then(answer => callback(answer.filepath))
        .catch(console.error);
};
module.exports = { inputPrompt, getInput, processInput }