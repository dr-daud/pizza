import { useState, useEffect } from 'react';

import Header from '../components/header/header';
import Categories from '../components/categories/categories';
import Sort from '../components/sort/sort';
import PizzaBlock from '../components/pizza-block/pizza-block';

import './app.scss'

function App() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://67af4195dffcd88a6786195f.mockapi.io/items')
            .then(res => res.json())
            .then(json => setItems(json))
    }, [])

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories />
                        <Sort />
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {items.map(obj => (
                            <PizzaBlock key={obj.id} {...obj} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
