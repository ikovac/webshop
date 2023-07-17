import * as dotenv from 'dotenv';
import databaseConfig from 'config/database.config';

dotenv.config();

export default {
  ...databaseConfig(),
  entities: [`${__dirname}/**/*entity.ts`],
};
