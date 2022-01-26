import './Nav.sass';
import cn from 'classnames';

export const Nav = ({ tabs, chosenTab }) => {
    return (
        <nav>
            {
            tabs.map(tab => {
                const isChosen = tab.id === chosenTab;
                return (
                <div key={tab.id} className={cn('item', {chosen: isChosen})}>
                    <a className={cn({chosen: isChosen})}
                        href={isChosen ? '#' : `/?tab=${tab.id}`}
                    >
                        { `${tab.label} (${tab.count})`}
                    </a>
                </div>
                )

            })
            }
        </nav>
    );
};