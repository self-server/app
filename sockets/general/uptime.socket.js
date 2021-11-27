const INTERVAL = 30000
const si = require('systeminformation')
var formatDuration = require('date-fns/formatDuration')
var intervalToDuration = require('date-fns/intervalToDuration')

module.exports = (ws) => {
  let observe = { time: 'uptime'}
  let callback = () => {
    si.get({ time: 'current, uptime' })
      .then(data => {
        let { current, uptime } = data.time
        let startTime = current - (uptime * 1000)

        let duration = intervalToDuration({
          start: new Date(startTime),
          end: new Date(current)
        })

        let options = {
          delimiter: ', ',
          format: ['years', 'months', 'days', 'hours', 'minutes']
        }

        ws._send({ uptime: formatDuration(duration, options) })
      })
  }
  
  let observer = si.observe(observe, INTERVAL, callback)
  ws.on('close', (ws) => clearInterval(observer))
  
  callback()
}