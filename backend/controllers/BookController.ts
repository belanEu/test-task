import { FastifyRequest } from 'fastify';
import { loggerNamespace } from 'cleverJS/build/core/logger/logger';
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

interface PaginatorParams {
    page: number,
    itemsPerPage: number
}

export class BookController {
    protected readonly logger = loggerNamespace('BookController');
    protected readonly deps: IDependencies;

    public constructor(deps: IDependencies) {
        this.deps = deps;
        this.initRoutes();
    }

    protected actionBookList = async(request: FastifyRequest) => {
        const { page, itemsPerPage } = request.query as PaginatorParams;

        const paginator = new Paginator();
        paginator.setCurrentPage(page);
        paginator.setItemsPerPage(itemsPerPage);

        const result = await this.deps.bookService.fetchBookList(paginator);

        return {
            success: true,
            data: {
                result,
            },
        };
    }

    protected actionChangeBookStatus = async(request: FastifyRequest) => {
        const { bookId, status } = request.body as ChangeBookStatusRequest;
        // todo: change status
    }

    protected initRoutes() {
        const app = this.deps.http.getServer();
        
        app.get('/api/books', this.actionBookList);
        app.post('/api/book_status', this.actionChangeBookStatus);
    }
}
