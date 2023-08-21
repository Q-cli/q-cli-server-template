import app from './src/app';
import config from './src/app/config';

app.listen(config.APP_PORT, () => console.log(`server listening port: ${config.APP_PORT}`));
