require('dotenv').config();
import knex from 'knex';
import config from './knexfile';

type IEnvironments = 'test' | 'development';

const environment: IEnvironments = (process.env.NODE_ENV as IEnvironments) || 'development';
console.log('Db config used: ', environment, config);

export default knex(config[environment]);
