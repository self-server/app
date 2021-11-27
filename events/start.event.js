


module.exports = {
  event: 'start',
  listener: 'once',
  callback: (...args) => {
    const si = require('systeminformation')
    si.get({ networkStats: 'iface' })
      .then(data => data.networkStats[0].iface)
      .then(iface => {
        si.get({ networkInterfaces: `iface, ip4 | iface:${iface}` })
          .then(data => data.networkInterfaces[0].ip4)
          .then(ip => {
            let port = process.env.NODE_ENV == 'development' ? `:${PORT}` : ''
            console.log('SelfServer running at http://%s%s', ip, port)
          })
      })
  }
}