const { WebSocketServer } = require('ws')
const fs = require('fs')
const glob = require('glob')

module.exports = {
  connect(server) {
    const socket = new WebSocketServer({ server, path: '/ws' })
    socket.on('connection', ws => {
      ws.$send = object => ws.send(JSON.stringify(object))
      glob(__dirname + "/*/*.js", (err, res) => {
        res.forEach(path => require(path)(ws))
      })
    })
  },
  sockets(dir) {
    return fs.readdirSync(dir)
             .filter(file => file.endsWith('.socket.js'))
             .map(file => `${dir}/${file}`)
  }
}

