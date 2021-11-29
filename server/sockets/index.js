const { WebSocketServer } = require('ws')
const fs = require('fs')

module.exports = {
  connect(server) {
    const socket = new WebSocketServer({ server, path: '/ws' })
    socket.on('connection', ws => {
      ws.$send = object => ws.send(JSON.stringify(object))
      
      // maybe autoload? maybe not?
      require('./general')(ws)
    })
  },
  sockets(dir) {
    return fs.readdirSync(dir)
             .filter(file => file.endsWith('.socket.js'))
             .map(file => `${dir}/${file}`)
  }
}

