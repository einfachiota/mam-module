const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const options = require('./lib/options')
const inquirer = require('./lib/inquirer')

clear()

console.log(
    chalk.yellow(figlet.textSync('MAM-Module', { horizontalLayout: 'full' }))
)

if (options.fileExists('options.js')) {
    console.log(chalk.red('Already a options file existing!'))
    process.exit()
} else {
    console.log(chalk.green('Creating options file...'))

    console.log(chalk.greenBright('Options file created.'))
}

const run = async () => {
    const _options = await inquirer.askForOptions()
    console.log(_options)
}

run()
console.log(chalk.greenBright('"MAM-Module started.'))
