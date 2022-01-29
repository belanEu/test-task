import { Tag } from './Tag';
import './BookList.sass';
import { getNextActions } from '../../stubs';

export const Book = ({ data, clickTag, changeBookStatus }) => {
    const { id, author, title, description, tags, status } = data;
    const nextAction = getNextActions()[status];

    return (
        <div className='book'>
            <div className='author'>{author}</div>
            
            <div className='title-row'>
                <span className='title'>{title}</span>
                <span className='action' onClick={() => changeBookStatus(id, nextAction.status)}>
                    { nextAction.label }
                </span>
            </div>
            
            <div className="description">
                {description}
            </div>

            <div className='tags'>
                { tags.map(tag => <span key={`${id}-${tag}`} className='tag-wrapper'>
                    <div onClick={() => clickTag(tag)}>
                        <Tag text={tag} />
                    </div>
                </span>) }
            </div>
        </div>
    );
};