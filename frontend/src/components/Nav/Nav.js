import './Nav.sass';
import cn from 'classnames';

export const Nav = ({ tabs, chosenTab }) => {
    return (
        <nav>
            {
            Object.keys(tabs).map(tab => {
                const isChosen = tab === chosenTab;
                return (
                <div key={tab} className={cn('item', {chosen: isChosen})}>
                    <a className={cn({chosen: isChosen})}
                        href={isChosen ? '' : `/?tab=${tab}`}
                    >
                        { tabs[tab] }
                    </a>
                </div>
                )

            })
            }
        </nav>
    );
};