module.exports = {
  event: 'start',
  listener: 'once',
  callback: (...args) => {
    console.log("\x1b[1m\x1b[35mSelfServer Starting\033[0m")
  }
}