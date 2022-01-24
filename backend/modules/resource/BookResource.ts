import { Condition } from 'cleverJS/build/core/db/Condition';
import { Paginator } from 'cleverJS/build/core/utils/Paginator';
import { AbstractDBResource } from 'cleverJS/core/db/sql/AbstractDBResource';
import { Book } from '../Book';

export class BookResource extends AbstractDBResource<Book> {
    protected table = 'books';

    public findAllBooks(condition: Condition) {
        return this.findAll(condition);
    }
}
