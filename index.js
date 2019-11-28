const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const Options = require('./lib/options')
const inquirer = require('./lib/inquirer')

clear()

console.log(
    chalk.yellow(figlet.textSync('MAM-Module', { horizontalLayout: 'full' }))
)
const runOptionsQuestions = async () => {
    const _options = await inquirer.askForOptions()
    console.log(_options)
    Options.createFile(_options)
}

if (Options.fileExists()) {
    console.log(chalk.yellow('Already a options file existing.'))
    process.exit()
} else {
    console.log(chalk.green('Creating options file...'))
    runOptionsQuestions()
}
