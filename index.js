const PORT  = process.env.PORT || 80
const views = __dirname + '/public/'

const si = require('systeminformation')

const express = require('express')

const app = express()
app.use(express.static(views))
app.get("/", (req, res) => res.sendFile(views + '/index.html'))

const server = app.listen(PORT, () => {
  // TODO: move this outside the index file
  si.get({ networkStats: 'iface' })
    .then(data => data.networkStats[0].iface)
    .then(iface => {
      si.get({ networkInterfaces: `iface, ip4 | iface:${iface}`})
        .then(data => data.networkInterfaces[0].ip4)
        .then(ip => console.log('SelfServer running at http://%s:%s', ip, PORT))
    })
})

require('./sockets').connect(server)