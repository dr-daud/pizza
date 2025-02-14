import { useState } from 'react';

import './categories.scss';

const Categories = () => {
    const [activeCategory, setActiveCategory] = useState(0);
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className="categories">
            <ul>
                {categories.map((item, i) => (
                    <li key={i} onClick={() => setActiveCategory(i)} className={activeCategory === i ? 'active' : ''}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default Categories;