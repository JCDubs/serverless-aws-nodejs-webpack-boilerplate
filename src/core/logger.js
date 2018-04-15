'use strict'
import winston from 'winston'
import fs from 'fs'
const tsFormat = () => (new Date()).toLocaleTimeString();

const LOG_LEVEL = process.env.LOG_LEVEL
const LOG_DIRECTORY = process.env.LOG_DIRECTORY
let transports = [new (winston.transports.Console)({ colorize: true, timestamp: tsFormat, level: LOG_LEVEL })]

if (LOG_DIRECTORY) {

    if (!fs.existsSync(LOG_DIRECTORY)) {
        fs.mkdirSync(LOG_DIRECTORY);
    }

    transports.push(new (winston.transports.File)({
        filename: `${LOG_DIRECTORY}/results.log`,
        timestamp: tsFormat,
        level: LOG_LEVEL
      }))
}

const logger = new (winston.Logger)({transports: transports});
logger.level = LOG_LEVEL
export default logger