import './BookList.sass';
import { Tag } from './Tag';

export const Filters = ({ tags }) => {
    return (
        <div className='filters'>
            <span className='text'>Filtered by tags:</span>
            { tags.map(tag => <span key={`filter-${tag}`} className='tag-wrapper'>
                    <Tag text={tag} />
                </span>) }
            <span>(<a>clear</a>)</span>
        </div>
    );
};