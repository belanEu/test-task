import { Knex, knex } from 'knex';
import cors from 'fastify-cors';
import { loggerNamespace } from 'cleverJS/core/logger/logger';
import { HttpServer } from 'cleverJS/core/http/HttpServer';
import { ISettings } from './configs/SettingsInterface';
import { BookController } from './controllers/BookController';
import { ConditionDbParser } from 'cleverJS/build/core/db/sql/condition/ConditionDbParser';
import { EntityFactory } from 'cleverJS/core/entity/EntityFactory';
import { BookService } from './modules/BookService';
import { BookResource } from './modules/resource/BookResource';
import { Book } from './modules/Book';
import { castBook } from './modules/helper';

export class App {
    protected readonly logger = loggerNamespace('App');
    protected readonly httpServer: HttpServer;
    protected readonly connection: Knex;

    constructor(settings: ISettings) {
        this.httpServer = new HttpServer(settings.http);
        this.registerFastifyPlugins();
        this.connection = knex(settings.connection);

        const bookService = new BookService(
            new BookResource(
                this.connection,
                new ConditionDbParser(),
                new EntityFactory(Book, castBook)
            )
        );
        new BookController({
            http: this.httpServer,
            bookService
        });
    }

    public async run() {
        await this.httpServer.start();
        try {
            const rows = await this.connection.raw('select 1 as result');
            if (!rows || !rows.length || rows[0]['result'] !== 1) {
                throw new Error();
            }
            this.logger.info('DB connection is successful');
        } catch(e) {
            this.logger.warn('Cannot connect to DB');
            process.exit(1);
        }
    }

    public destroy() {
        return async () => {
            await this.httpServer.destroy();
            await new Promise(resolve => {
                this.connection.destroy(() => resolve(true));
                this.logger.info('DB connection closed');
            });
        };
    }

    protected registerFastifyPlugins() {
        this.httpServer.getServer().register(cors, {
            origin: true,
            credentials: true,
            allowedHeaders: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'authorization', 'Content-Type'],
        })
    }
}