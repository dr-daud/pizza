import { Routes, Route } from "react-router";

import Header from '../components/header/header';
import Categories from '../components/categories/categories';
import Sort from '../components/sort/sort';
import Home from '../pages/home'
import NotFound from '../pages/not-found';

import './app.scss'

function App() {

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
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default App
