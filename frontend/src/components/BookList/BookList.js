import { Book } from "./Book";
import './BookList.sass';

export const BookList = ({books}) => {
    return (
        <section className="book-list">
            { books.map(book => <Book key={book.id} data={book} />) }
        </section>
    );
};