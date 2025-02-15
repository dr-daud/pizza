import { useState, useEffect } from 'react';

import PizzaBlock from '../components/pizza-block/pizza-block';
import Skeleton from '../components/skeleton/skeleton';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://67af4195dffcd88a6786195f.mockapi.io/items')
            .then(res => res.json())
            .then(json => {
                setItems(json)
                setIsLoading(false)
            })
    }, [])

    return (
        <div className="content__items">
            {isLoading
                ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
                : items.map(obj => (<PizzaBlock key={obj.id} {...obj} />))}
        </div>
    )
}

export default Home