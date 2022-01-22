import { Nav } from '../Nav/Nav';
import { BookList } from '../BookList/BookList';
import './Widget.sass';
import { getBooks, getTabs } from '../../stubs';
import { getTabFromUrl, getTagsFromUrl } from '../../utils';

export const Widget = () => {
    return (
        <div className="widget">
            <Nav tabs={getTabs()} chosenTab={getTabFromUrl()} />
            <BookList books={getBooks()} tags={getTagsFromUrl()} />
        </div>
    );
};