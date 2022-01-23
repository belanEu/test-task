import { FastifyRequest } from 'fastify';
import { loggerNamespace } from 'cleverJS/build/core/logger/logger';
import { HttpServer } from 'cleverJS/build/core/http/HttpServer';
import { Paginator } from 'cleverJS/core/utils/Paginator';

interface IDependencies {
    http: HttpServer
}

export class BookController {
    protected readonly logger = loggerNamespace('BookController');
    protected readonly deps: IDependencies;

    public constructor(deps: IDependencies) {
        this.deps = deps;
        this.initRoutes();
    }

    protected async test(request: FastifyRequest) {
        return 'test';
    }

    protected initRoutes() {
        const app = this.deps.http.getServer();
        
        app.get('/api/test', this.test);
    }
}

