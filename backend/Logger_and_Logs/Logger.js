const {createLogger, transports, format} = require("winston")

const authLogger = createLogger({
    transports: [
        new transports.File({
            // save log file to
            filename: "./Logger_and_Logs/user_Logs/user.log",
            //level of message (error,warn, info, http, verbose, debug, silly)
            level: "verbose",
            // save log data in format of 
        format: format.combine(format.timestamp(), format.json()),
      }),
      new transports.File({
        filename: "./Logger_and_Logs/user_Logs/user-error.log",
        level: "error", // Set the log level for this transport to 'error'
        format: format.combine(format.timestamp(), format.json()),
      }),
    ],
  });
  
  module.exports = { authLogger };