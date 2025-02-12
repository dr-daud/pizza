import Header from '../components/header/header';
import Categories from '../components/categories/categories';
import Sort from '../components/sort/sort';
import PizzaBlock from '../components/pizza-block/pizza-block';

import './app.scss'

function App() {

    return (
        <div class="wrapper">
            <Header />
            <div class="content">
                <div class="container">
                    <div class="content__top">
                        <Categories />
                        <Sort />
                    </div>
                    <h2 class="content__title">Все пиццы</h2>
                    <div class="content__items">
                        <PizzaBlock />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
