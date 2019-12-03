const { Router } = require('express')
const { createChannel, getAllChannels } = require('../models/channel.js')

const app = Router()

// Get all channels
app.get('/', function(req, res) {
    getAllChannels().then(channels => {
        res.send(channels)
    })
})

// Create new channel
app.post('/', function(req, res) {
    const data = req.body
    console.log('data', data)
    createChannel(data, 'password').then(channel => {
        console.log('channel: ', channel)
        // send reponse with address.
        res.send({
            message: `Channel created.`,
            channel: channel,
        })
    })
})

module.exports = app
