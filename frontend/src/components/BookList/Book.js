import './BookList.sass';

export const Book = ({ data }) => {
    const { id, author, title, description, tags } = data;

    return (
        <div className='book'>
            <div className='author'>{author}</div>
            
            <div className='title-row'>
                <span className='title'>{title}</span>
                <span className='action'>
                    start reading
                </span>
            </div>
            
            <div className="description">
                {description}
            </div>

            <div className='tags'>
                { tags.map(tag => <span key={`${id}-${tag}`} className='tag'>{ tag }</span>) }
            </div>
        </div>
    );
};