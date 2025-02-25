import { useState, useEffect } from 'react';

import PizzaBlock from '../components/pizza-block/pizza-block';
import Skeleton from '../components/skeleton/skeleton';
import Categories from '../components/categories/categories';
import Sort from '../components/sort/sort';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });

    useEffect(() => {
        setIsLoading(true)

        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'desc' : 'asc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        fetch(`https://67af4195dffcd88a6786195f.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
            .then(res => res.json())
            .then(json => {
                setItems(json)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
                <Sort value={sortType} onClickSort={(obj) => setSortType(obj)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
                    : items.map(obj => (<PizzaBlock key={obj.id} {...obj} />))}
            </div>
        </div>
    )
}

export default Home