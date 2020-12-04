const moment = require("moment")

console.log( moment()
.utc()
.subtract(1, "hour"))

console.log(moment()
.utc()
.subtract(7, "day"))
console.log(moment(1606521600000).utc().add(30, "day").week())