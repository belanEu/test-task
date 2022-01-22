import { Nav } from '../Nav/Nav';
import { BookList } from '../BookList/BookList';

import './Widget.sass';
import { getBooks } from '../../stubs';

export const Widget = () => {
    return (
        <div className="widget">
            <Nav tabs={['To read', 'In progress', 'Done']} />
            <BookList books={getBooks()} />
        </div>
    );
};