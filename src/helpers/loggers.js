import * as winston from 'winston';

const {
  align,
  combine,
  timestamp,
  printf
} = winston.format;

// eslint-disable-next-line no-shadow
const stampFormat = printf(({ level, timestamp, stack }) => (
  `======================================================================
${timestamp} ${level.toUpperCase()}: ${stack}
`));

// winston.config.syslog.colors = {
//   emerg: 'bold red whiteBG',
//   alert: 'bold red whiteBG',
//   crit: 'red whiteBG',
//   error: 'red',
//   warning: 'yellow',
//   notice: 'white',
//   info: 'white',
//   debug: 'blue',
// };

// winston.addColors(winston.config.syslog);

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  level: 'debug',
  format: combine(
    timestamp({ format: 'DD-MM-YYYY/HH:mm:ss' }),
    align(),
    stampFormat,
  ),
  transports: [
    new winston.transports.File({
      filename: 'logs/GlobalLog.log',
      level: 'info',
    }),
    new winston.transports.File({
      filename: 'logs/Error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/Warn.log',
      level: 'warning',
    }),
    new winston.transports.File({
      filename: 'logs/Debug.log',
      level: 'debug',
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({ level: 'debug' }));
}

export default logger;