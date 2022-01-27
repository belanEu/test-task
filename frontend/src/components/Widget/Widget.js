import { Nav } from '../Nav/Nav';
import { BookList } from '../BookList/BookList';
import './Widget.sass';
import { getTabFromUrl } from '../../utils';

export const Widget = ({tabs, tags, books}) => {
    return (
        <div className="widget">
            <Nav tabs={tabs} chosenTab={getTabFromUrl()} />
            <BookList books={books} tags={tags} />
        </div>
    );
};