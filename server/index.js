const PORT   = process.env.PORT || 8080
const views  = __dirname + '/../public/'

const events = require('./events')
events.trigger('start')

const express = require('express')
const app     = express()

// vue as static asset
const vue     = express.static(views)
app.use(vue)

// stupid workaround for vuerouter
const history = require('connect-history-api-fallback')
app.use(history({ disableDotRule: true, verbose: true }))
app.use(vue) // guess it has to happen a second time here

// router
app.get("/", (req, res) => res.sendFile(views + '/index.html'))

const server = app.listen(PORT, () => {
  events.trigger('ready')
})

require('./sockets').connect(server)