const inquirer = require('inquirer')

module.exports = {
    askForOptions: () => {
        const questions = [
            {
                name: 'seed',
                type: 'input',
                message:
                    'Please enter a new seed (for random seed leave it blank) \n',
                validate: function(value) {
                    if (value.length === 81) {
                        return true
                    } else if (value.length === 0) {
                        // TODO: Generate new seed.
                        return true
                    } else if (value.length > 81) {
                        return 'Your intput has more than 81 charakters. Please enter a correct seed.'
                    } else if (value.length < 81) {
                        return 'Your intput has less than 81 charakters. Please enter a correct seed.'
                    } else {
                        return 'Please enter your seed.'
                    }
                },
            },
        ]
        return inquirer.prompt(questions)
    },
}
