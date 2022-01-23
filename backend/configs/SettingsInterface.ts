import { ILoggerConfig } from "cleverJS/core/logger/config";
import { IHttpServerConfig } from 'cleverJS/core/http/config';
import { Knex } from "knex";

export interface ISettings {
    baseDir: string,
    runtimeDir: string,
    logger: ILoggerConfig,
    
    http: IHttpServerConfig,
    
    connection: Knex.Config
}