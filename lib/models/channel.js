module.exports = {
    createChannel,
    getAllChannels,
}

function createChannel(data) {
    return new Promise(function(resolve, reject) {
        resolve('channel')
    })
}

function getAllChannels() {
    return new Promise(function(resolve, reject) {
        resolve('channel')
    })
}
