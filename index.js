const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const Options = require('./lib/options')
const inquirer = require('./lib/inquirer')
const express = require('express')
const app = express()
const mamModule = require('./lib/mam-server')

clear()

console.log(
    chalk.yellow(figlet.textSync('MAM-Module', { horizontalLayout: 'full' }))
)
const runOptionsQuestions = async () => {
    const _options = await inquirer.askForOptions()
    console.log(_options)
    Options.createFile(_options)
    startServer()
}

const startServer = () => {
    console.log(chalk.yellow('Start server...'))
    let server = mamModule.createServer(app, {})

    server.listen(3000, function() {
        console.log(`Server started on http://localhost:3000 `)
    })
}

if (Options.exist()) {
    console.log(chalk.yellow('Already a options file existing.'))
    startServer()
} else {
    console.log(chalk.green('Creating options file...'))
    runOptionsQuestions()
}
