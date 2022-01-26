import { FastifyRequest } from 'fastify';
import { loggerNamespace } from 'cleverJS/build/core/logger/logger';
import { resolvePromiseMap } from 'cleverJS/core/utils/promise';
import { HttpServer } from 'cleverJS/build/core/http/HttpServer';
import { Paginator } from 'cleverJS/core/utils/Paginator';
import { BookService } from './../modules/BookService';

interface IDependencies {
    http: HttpServer,
    bookService: BookService
}

interface ChangeBookStatusRequest {
    bookId: number,
    status: string
}

interface BookListRequest {
    page: number,
    itemsPerPage: number,
    status: string,
    tags?: string
}

interface StatusCountersRequest {
    statuses: string
};

export class BookController {
    protected readonly logger = loggerNamespace('BookController');
    protected readonly deps: IDependencies;

    public constructor(deps: IDependencies) {
        this.deps = deps;
        this.initRoutes();
    }

    protected actionBookList = async (request: FastifyRequest) => {
        const { page, itemsPerPage, status } = request.query as BookListRequest;

        const paginator = new Paginator();
        paginator.setCurrentPage(page);
        paginator.setItemsPerPage(itemsPerPage);

        const result = await this.deps.bookService
            .fetchBookList(status, paginator);

        return {
            success: true,
            data: {
                result,
            },
        };
    }

    protected actionFilteredBookList = async (request: FastifyRequest) => {
        const { page, itemsPerPage, status, tags } = request.query as BookListRequest;

        const paginator = new Paginator();
        paginator.setCurrentPage(page);
        paginator.setItemsPerPage(itemsPerPage);        

        const result = await this.deps.bookService.fetchFilteredBookList(
            { status, tags: tags.split(',').map(tag => tag.trim()) },
            paginator
        );

        return {
            success: true,
            data: {
                result,
            },
        };
    }

    protected actionStatusCounters = async (request: FastifyRequest) => {
        const { statuses } = request.query as StatusCountersRequest;
        
        const promiseMap = new Map();
        statuses.split(',').forEach(status => promiseMap.set(status, this.deps.bookService.countBooksByStatus(status)));

        const result = await resolvePromiseMap(promiseMap);

        return {
            success: true,
            data: {
                result,
            },
        };
    }

    protected actionChangeBookStatus = async (request: FastifyRequest) => {
        const { bookId, status } = request.body as ChangeBookStatusRequest;
        const result = await this.deps.bookService.changeBookStatus(bookId, status);
        return {
            success: result !== false,
            data: {
                result: result
            },
        };
    }

    protected initRoutes() {
        const app = this.deps.http.getServer();
        const opts = {
            schema: {
                querystring: {
                    type: 'object',
                    properties: {
                        page: { type: 'number' },
                        itemsPerPage: { type: 'number' },
                        status: { type: 'string' },
                        tags: { type: 'string' }
                    }
                }
            }
        };

        app.get('/api/books', opts, this.actionBookList);
        app.get('/api/filtered_books', opts, this.actionFilteredBookList);
        app.get('/api/status_counters', this.actionStatusCounters);
        app.post('/api/book_status', this.actionChangeBookStatus);
    }
}
