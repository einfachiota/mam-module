const fs = require('fs')
const path = require('path')
const FILE_NAME = 'options.json'

module.exports = {
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd())
    },

    fileExists: () => {
        return fs.existsSync(FILE_NAME)
    },
    createFile: options => {
        const jsonContent = JSON.stringify(options)
        return fs.writeFile(FILE_NAME, jsonContent, 'utf8', function(err) {
            if (err) return err
        })
    },
}
