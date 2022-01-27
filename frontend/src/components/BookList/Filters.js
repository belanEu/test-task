import './BookList.sass';
import { Tag } from './Tag';

export const Filters = ({ tags, clear }) => {
    return (
        <div className='filters'>
            <span className='text'>Filtered by tags:</span>
            { tags.map(tag => <span key={`filter-${tag}`} className='tag-wrapper'>
                    <Tag text={tag} />
                </span>) }
            <span className='clear' onClick={() => clear()}>(clear)</span>
        </div>
    );
};