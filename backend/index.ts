import { resolve } from 'path';
import { logger } from 'cleverJS/core/logger/logger';
import { TransportWinston } from 'cleverJS/core/logger/transport/TransportWinston';
import { destroy } from 'cleverJS/core/utils/destroy';
import { settings } from './configs';
import { App } from './App';

logger.setConfig(settings.logger);
logger.addTransport(
    new TransportWinston(resolve(settings.runtimeDir, 'logs'))
);
logger.debug('enabled');

const { host, port } = settings.http;
const app = new App(settings);
app.run()
.then(() => logger.info(
    `Application is running on ${host}:${port}`
))
.catch(logger.error);

destroy(app.destroy(), 30_000);
