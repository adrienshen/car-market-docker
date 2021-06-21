const http = require('http');
const stoppable = require('stoppable');
const ConsoleHrTime = require('console-hrtime');
const timer = new ConsoleHrTime();
timer.start('init');

import logger from './src/logger';

require('dotenv').config();

import app from './src/app';
import ErrorHandler from './src/errors/handler';
const LOG_ID = 'APP';

function startServer(app) {
  const server = stoppable(http.createServer(app).listen(process.env.PORT || 8000));

  // Graceful shutdown on SIGTERM (via stoppable)
  process.on('SIGTERM', () => handleSigTerm(server));
  process.on('uncaughtException', (error: Error) => {
    ErrorHandler.handleError(error);
    if (!ErrorHandler.isTrustedError(error)) {
      console.log('>>> Program error, exit now.');
      // The idea is that the docker container environment should restart the app in case of a unhandled
      // error crash
      process.exit(1);
    }
  });

  logger.info(`${LOG_ID} Listening on port ${process.env.PORT || 8000}`);
  logEndTime();
}

function handleSigTerm(server) {
  logger.info('APP:SHUTDOWN SIGTERM received, will attempt graceful shutdown in 5 seconds');
  setTimeout(() => {
    logger.info('APP:SHUTDOWN Now attempting graceful shutdown');
    server.stop((err) => {
      if (!err) {
        logger.info('APP:SHUTDOWN Graceful shutdown complete');
        return;
      }
      logger.error(`APP:SHUTDOWN Graceful shutdown error: ${err}`);
      process.exitCode = 1;
      process.exit();
    });
  }, 5000);
}

function logEndTime() {
  const time = timer.end('init');
  const timeUnits = timer.msToUnits(time, 3);
  logger.info(`${LOG_ID}: Startup time: ${timeUnits.value} ${timeUnits.units}`);
}

startServer(app);
