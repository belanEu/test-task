import { Book } from "./Book";
import { EmptyList } from "./EmptyList";
import { Filters } from "./Filters";
import './BookList.sass';

export const BookList = ({books, tags}) => {
    const hasToBeFiltered = tags.length > 0;
    const renderBooks = hasToBeFiltered ?
    books.filter(book => book.tags.some(tag => tags.includes(tag)))
    :
    books;
    
    return (
        <section className="book-list">
            { hasToBeFiltered ? <Filters tags={tags} /> : '' }
            { renderBooks.map(book => <Book key={book.id} data={book} />) }
            { renderBooks.length === 0 ? <EmptyList /> : '' }
        </section>
    );
};