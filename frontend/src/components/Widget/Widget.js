import { Nav } from '../Nav/Nav';

import './Widget.sass';

export const Widget = () => {
    return (
        <div className="widget">
            <Nav tabs={['To read', 'In progress', 'Done']} />
            <section></section>
        </div>
    );
};