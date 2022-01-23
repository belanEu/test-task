import { Paginator } from 'cleverJS/build/core/utils/Paginator';
import { AbstractDBResource } from 'cleverJS/core/db/sql/AbstractDBResource';
import { Book } from '../Book';

export class BookResource extends AbstractDBResource<Book> {
    protected table = 'books';

    public findAllBooks(paginaction: Paginator) {
        return this.findAll(null, paginaction);
    }
}
