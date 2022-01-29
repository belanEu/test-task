import { Book } from "./Book";
import { EmptyList } from "./EmptyList";
import { Filters } from "./Filters";
import './BookList.sass';
import { getTagsFromUrl, goTo, getTabFromUrl } from "../../utils";

export const BookList = ({books, tags, handleChangeBookStatus}) => {
    const handleAddTag = tag => {
        const tags = getTagsFromUrl();
        if (!tags.includes(tag)) {
            tags.push(tag);
            goTo(getTabFromUrl(), tags);
        }
    };
    const handleClearTags = () => {
        goTo(getTabFromUrl());
    };

    return (
        <section className="book-list">
            { tags.length > 0 ? <Filters tags={tags} clear={() => handleClearTags()} /> : '' }
            { books.map(book =>
                <Book key={book.id + book.title}
                data={book}
                clickTag={tag => handleAddTag(tag)}
                changeBookStatus={(id, status) => handleChangeBookStatus(id, status)}
                />) }
            { books.length === 0 ? <EmptyList /> : '' }
        </section>
    );
};