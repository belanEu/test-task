import { Book } from "./Book";
import { BookResource } from "./resource/BookResource";
import { AbstractService } from "cleverJS/build/core/AbstractService";
import { Paginator } from "cleverJS/build/core/utils/Paginator";
import { Condition, IConditionItemList, TConditionOperator } from "cleverJS/build/core/db/Condition";

type FilterBy = {
    status: string,
    tags: string[]
};

export class BookService extends AbstractService<Book, BookResource> {
    public fetchBookList(bookStatus: string, paginator: Paginator) {
        const condition = {
            conditions: [{ operator: TConditionOperator.EQUALS, field: 'status', value: bookStatus }]
        } as IConditionItemList;
        return this.resource.findBooksWithPagination(new Condition(condition), paginator);
    }

    public async fetchFilteredBookList(filterBy: FilterBy, paginator: Paginator) {
        const condition = {
            conditions: [{ operator: TConditionOperator.EQUALS, field: 'status', value: filterBy.status }]
        } as IConditionItemList;
        const tagsMap = {};
        filterBy.tags.map(tag => tagsMap[tag] = true);

        const allBooks = await this.resource.findAllBooks(new Condition(condition));

        const start = paginator.getOffset(), end = start + paginator.getLimit();

        return allBooks
            .filter(book => book.tags.some(tag => tagsMap[tag] !== undefined))
            .slice(start, end);
    }

    public countBooksByStatus(status: string) {
        return this.resource.count(new Condition({
            conditions: [{ operator: TConditionOperator.EQUALS, field: 'status', value: status }]
        }));
    }
}