const appRoot = require('app-root-path');
const winston = require('winston');

const timezoned = () => {
    return new Date().toLocaleString('pt-BR', 
    { timeZone: 'America/Sao_Paulo' })
};

const options = {
    file: {
      level: 'info',
      filename: `${appRoot}/src/logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({format: timezoned()}),
        winston.format.prettyPrint()
      ),
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
  });

  logger.stream = {
    write: (message, encoding) => {
      logger.info(message);
    },
  };

  module.exports = logger;