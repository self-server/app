const { sockets } = require('..')

module.exports = (ws) => {
  ws._send = general => ws.$send({ general })
  sockets(__dirname).map(file => require(file)(ws))
  
  ws._send({ online: true })

}