import bunyan from "bunyan";
const log = bunyan.createLogger({ name: "Sponsor Buddy API" });

console.log = log.info.bind(log);
console.error = log.error.bind(log);
console.debug = log.debug.bind(log);
console.info = log.info.bind(log);
