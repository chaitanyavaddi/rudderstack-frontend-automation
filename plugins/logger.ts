const winston = require('winston');

const { combine, timestamp, printf } = winston.format;

const customFormat = printf(({ level, message, timestamp }) => {
    level = level.toUpperCase()
    return `${timestamp} [${level}]: ${message}`;
});

const console = new winston.transports.Console();

const logger = winston.createLogger({
    level: 'debug',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
    ),
    transports: [
        new winston.transports.File({ filename: './output/logs/info.log', level: 'info' }),
    ],
});

logger.add(console);

export default logger;