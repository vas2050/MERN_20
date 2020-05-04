const log4js = require("log4js");
  
const HOME = process.env.HOME;
const LOGDIR = `${HOME}/MERN/covid-20/back-end/logs`; 
const logFile = `${LOGDIR}/app.log`;

log4js.configure({
  appenders: {
    console: { type: "stdout" },
    logFile: {
      type: "dateFile",
      filename: logFile,
      pattern: ".yyyy-MM-dd",
      compress: true,
      backups: 3,
      maxLogSize: 5242880
    }
  },
  categories: {
    default: { appenders: [ "logFile", "console" ], level: "info" }
  }
});

exports.logger = log4js.getLogger();
