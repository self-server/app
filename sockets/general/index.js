const { sockets } = require('..')

module.exports = (ws) => {
  ws._send = general => ws.$send({ general })
  ws._send({ online: true })

  sockets(__dirname).map(file => require(file)(ws))
}