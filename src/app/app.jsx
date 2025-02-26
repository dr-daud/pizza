import { Routes, Route } from "react-router";
import { useState, createContext } from "react";

import Header from '../components/header/header';
import Home from '../pages/home'
import NotFound from '../pages/not-found';
import Cart from '../pages/cart';

import './app.scss'

export const SearchContext = createContext('');

function App() {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className="wrapper">
            <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                <Header />
                <div className="content">
                    <Routes>
                        <Route path='/' element={<Home searchValue={searchValue} />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </div>
            </SearchContext.Provider>
        </div>
    )
}

export default App
