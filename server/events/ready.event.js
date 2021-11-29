module.exports = {
  event: 'ready',
  listener: 'once',
  callback: (...args) => {
    console.log("\x1b[1m\x1b[35mSelfServer Started\033[0m")
  }
}