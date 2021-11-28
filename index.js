const PORT  = process.env.PORT || 8080

const events = require('./events') 

const express = require('express')
const app = express()
const views = __dirname + '/public/'
app.use(express.static(views))
app.get("/", (req, res) => res.sendFile(views + '/index.html'))

const server = app.listen(PORT, () => {
  events.trigger('start')
})

require('./sockets').connect(server)