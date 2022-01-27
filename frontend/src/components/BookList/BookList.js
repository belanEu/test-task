import { Book } from "./Book";
import { EmptyList } from "./EmptyList";
import { Filters } from "./Filters";
import './BookList.sass';
import { getTagsFromUrl, goTo, getTabFromUrl } from "../../utils";

export const BookList = ({books, tags}) => {
    const handleAddTag = tag => {
        const tags = getTagsFromUrl(), tab = getTabFromUrl();
        if (!tags.includes(tag)) {
            tags.push(tag);
            goTo(tab, tags);
        }
    };

    return (
        <section className="book-list">
            { tags.length > 0 ? <Filters tags={tags} /> : '' }
            { books.map(book => <Book key={book.id + book.title} data={book} clickTag={tag => handleAddTag(tag)} />) }
            { books.length === 0 ? <EmptyList /> : '' }
        </section>
    );
};