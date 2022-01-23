import { resolve } from 'path';
import { connection } from './knexfile';
import { ISettings } from './SettingsInterface';

export const settings: ISettings = {
    baseDir: resolve(__dirname, '..'),
    runtimeDir: resolve(__dirname, '../runtime'),
    logger: {
        debug: true,
        warn: true,
        info: true,
    },
    
    http: {
        port: 8000,
        host: 'localhost',
    },
    
    connection
};