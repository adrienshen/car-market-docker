const express = require('express');
const expressLogger = require('morgan');
const cors = require('cors');

import logger from './logger';
import APIRouter from './routes/api';

logger.info(`Environment is: ${process.env.NODE_ENV}`);

const app = express();
app
  .use(cors('*'))
  .use(expressLogger(
    process.env.NODE_ENV === 'development'
      ? 'dev'
      : ':method :url :status :res[content-length] - :response-time ms',
  ))

app
  .use('/api/v1', APIRouter)

export default app;
