const si = require('systeminformation')
var formatDuration = require('date-fns/formatDuration')
var intervalToDuration = require('date-fns/intervalToDuration')

module.exports = (ws) => {
  si.get({ osInfo: 'hostname' })
    .then(data => ws._send({ hostname: data.osInfo.hostname }))
}