const glob = require('glob')
module.exports = (ws) => {
  ws._send = general => ws.$send({ general })

  glob(__dirname + '*.socket.js', (err, res) => {
    res.forEach(file => require(file)(ws))
  })

  ws.on('message', (msg) => {
    let message = JSON.parse(msg)
    console.log(message)
  })

  
  ws._send({ online: true })

}