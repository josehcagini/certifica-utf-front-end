import { createLogger, format, transports } from 'winston'

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Adds a timestamp to each log
    format.printf(({ timestamp, level, message, ...rest }) => {
      return `${timestamp} ${level}: ${message} rest: ${JSON.stringify(rest)}`
    })
  ),
  transports: [
    new transports.Console({
      format: format.colorize({
        all: true,
      }),
    }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/debug.log', level: 'debug' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
})

export default logger
