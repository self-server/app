const EventEmitter = require('events')
const fs = require('fs')

class Events {
  constructor() {
    this.emitter = new EventEmitter()
    this.load()
  }

  load() {
    fs.readdirSync(__dirname)
      .filter(file => file.endsWith('.event.js'))
      .forEach(file => {
        const { listener, event, callback } = require(__dirname + `/${file}`) 
        this[listener](event, callback)
      })
  }

  on(event, callback)   { this.emitter.on(event, callback) }
  once(event, callback) { this.emitter.once(event, callback) }

  trigger(event) {
    this.emitter.emit(event)
  }
}


module.exports = new Events()