import app from './src/app';
import config from './src/app/config';
import logger from './src/utils/logger';

app.listen(config.APP_PORT, () => logger.info(`server listening port: ${config.APP_PORT}`));
