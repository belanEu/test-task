import { Book } from "./Book";
import { EmptyList } from "./EmptyList";
import './BookList.sass';

export const BookList = ({books}) => {
    return (
        <section className="book-list">
            { books.map(book => <Book key={book.id} data={book} />) }
            { books.length === 0 ? <EmptyList /> : '' }
        </section>
    );
};