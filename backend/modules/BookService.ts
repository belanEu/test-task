import { Book } from "./Book";
import { BookResource } from "./resource/BookResource";
import { AbstractService } from "cleverJS/build/core/AbstractService";
import { Paginator } from "cleverJS/build/core/utils/Paginator";
import { Condition, IConditionItemList, TConditionOperator } from "cleverJS/build/core/db/Condition";

export class BookService extends AbstractService<Book, BookResource> {
    public fetchBookList(bookStatus: string, paginator: Paginator) {
        const condition = {
            conditions: [{ operator: TConditionOperator.EQUALS, field: 'status', value: bookStatus }]
        } as IConditionItemList;
        return this.resource.findBooksWithPagination(new Condition(condition), paginator);
    }
}