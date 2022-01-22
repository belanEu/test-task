import './Nav.sass';

export const Nav = ({ tabs }) => {
    return (
        <nav>
            { tabs.map(tab => (<div key={tab} className="item">{ tab }</div>)) }
        </nav>
    );
};