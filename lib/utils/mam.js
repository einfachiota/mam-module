const Mam = require('@iota/mam')
const { asciiToTrytes } = require('@iota/converter')
const { provider } = require('../../options.json')

// Publish to tangle
const publish = async (data, mamState) => {
    return new Promise(async function(resolve, reject) {
        try {
            // Create MAM Payload - STRING OF TRYTES
            const trytes = asciiToTrytes(JSON.stringify(data))
            const message = Mam.create(mamState, trytes)
            // Attach the payload.
            Mam.setIOTA(provider)
            await Mam.attach(message.payload, message.address, 3, 14)
            resolve({ root: message.root, state: message.state })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    publish,
}
