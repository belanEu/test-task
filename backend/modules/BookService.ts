import { Book } from "./Book";
import { BookResource } from "./resource/BookResource";
import { AbstractService } from "cleverJS/build/core/AbstractService";
import { Paginator } from "cleverJS/build/core/utils/Paginator";

export class BookService extends AbstractService<Book, BookResource> {
    public fetchBookList(paginator: Paginator) {
        return this.resource.findAllBooks(paginator);
    }
}