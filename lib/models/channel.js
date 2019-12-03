const { provider } = require('../../options.json')
const { generateSeed } = require('../utils/iota')
const { publish } = require('../utils/mam')
const { asciiToTrytes } = require('@iota/converter')

const Mam = require('@iota/mam')

function createChannel(data, key) {
    return new Promise(async function(resolve, reject) {
        let seed = generateSeed()

        let state_object = Mam.init(provider, seed, 2)
        let sideKey = asciiToTrytes(key)

        while (sideKey.length % 81 !== 0) {
            sideKey += '9'
        }

        state_object = Mam.changeMode(state_object, 'restricted', sideKey)
        try {
            // create object
            let object = {}
            object.data = data
            object.timestamp = Date.now()
            object.status = 'created'

            // publish object
            object.channel = await publish(object, state_object)

            resolve(object)
        } catch (error) {
            console.log('createMAMChannel error', error)
            reject()
        }
    })
}

function getAllChannels(body) {
    return new Promise(async function(resolve, reject) {
        resolve('not implemeneted yet')
    })
}

module.exports = {
    createChannel,
    getAllChannels,
}
