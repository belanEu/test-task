import './BookList.sass';

export const Tag = ({text}) => {
    return (
        <span className='tag'>#{ text }</span>
    );
};