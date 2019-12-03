const { generateSeed } = require('../utils/iota')
const { publish } = require('../utils/mam')
const { asciiToTrytes } = require('@iota/converter')
const { provider } = require('../../options.json')

const Mam = require('@iota/mam')

const db = require('../database')
const shortid = require('shortid')

function createChannel(data, key) {
    return new Promise(async function(resolve, reject) {
        let seed = generateSeed()

        console.log('heyhey', data, key)
        let state_object = Mam.init(provider, seed, 2)
        let sideKey = asciiToTrytes(key)
        console.log('heyhey', state_object)

        while (sideKey.length % 81 !== 0) {
            sideKey += '9'
        }

        state_object = Mam.changeMode(state_object, 'restricted', sideKey)
        try {
            // create object
            let object = {}
            object.id = shortid.generate()
            object.data = data
            object.timestamp = Date.now()
            object.status = 'created'

            // publish object
            object.channel = await publish(object, state_object)
            db.get('channels')
                .push(object)
                .write()
            resolve(object)
        } catch (error) {
            console.log('createMAMChannel error', error)
            reject()
        }
    })
}

function createMessage(channel_id, data) {
    return new Promise(async function(resolve, reject) {
        try {
            let channel = db
                .get('channels')
                .find({ id: channel_id })
                .value()

            console.log('channel', channel)
            console.log('root: ', channel.channel.root)
            console.log('seed: ', channel.channel.state.seed)
            console.log('nxt_root: ', channel.channel.state.channel.next_root)
            console.log('start+1:  ', channel.channel.state.channel.start + 1)
            console.log('key: ', channel.channel.state.channel.side_key)
            let message = await appendChannel(
                channel_id,
                data,
                channel.channel.root,
                channel.channel.state.seed,
                channel.channel.state.channel.next_root,
                channel.channel.state.channel.start,
                channel.channel.state.channel.side_key
            )
            console.log('message', message)

            resolve(message)
        } catch (error) {
            console.log('createMessage error', error)
            reject()
        }
    })
}

function appendChannel(
    channel_id,
    data,
    root,
    seed,
    next_root,
    start,
    side_key
) {
    const mamState = {
        subscribed: [],
        channel: {
            side_key: side_key,
            mode: 'restricted',
            next_root: next_root,
            security: 2,
            start: start,
            count: 1,
            next_count: 1,
            index: 0,
        },
        seed: seed,
    }

    console.log('mamState', mamState)

    const promise = new Promise(async (resolve, reject) => {
        try {
            if (root) {
                const eventBody = {}
                eventBody.data = data
                eventBody.timestamp = Date.now()
                eventBody.status = 'appended'
                console.log('mamState in', mamState)

                const mamData = await publish(eventBody, mamState)
                console.log('whatsup', mamData)

                let channel = {
                    root: root,
                    state: mamState,
                }

                db.get('channels')
                    .find({ id: channel_id })
                    .assign({ channel: channel })
                    .write()

                return resolve(eventBody)
            }
            return reject()
        } catch (error) {
            console.log('appendChannel error', error)
            return reject()
        }
    })

    return promise
}

function getAllChannels(body) {
    return new Promise(async function(resolve, reject) {
        const channels = db.get('channels').value()
        resolve(channels)
    })
}

module.exports = {
    createChannel,
    getAllChannels,
    createMessage,
}
