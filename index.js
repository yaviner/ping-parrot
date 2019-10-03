const args = require('args')
const ping = require('ping')

args
  .option('host', 'Host to ping', 'google.com')
  .option('interval', 'How often to hit the host, in seconds', 15)
  .option('timeout', 'Max timeout for an individual ping', 5)

const flags = args.parse(process.argv)
const cfg = {
  timeout: flags.timeout
}

function probe () {
  ping.promise.probe(flags.host, cfg)
    .then((res) => {
      console.log(`Ping to ${flags.host} returned in ${res.time}ms`)
    })
}

probe()
setInterval(probe, flags.interval * 1000)
