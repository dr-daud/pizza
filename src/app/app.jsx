import { Routes, Route } from "react-router";

import Header from '../components/header/header';
import Home from '../pages/home'
import NotFound from '../pages/not-found';
import Cart from '../pages/cart';

import './app.scss'

function App() {

    return (
        <div className="wrapper">
                <Header />
                <div className="content">
                    <Routes>
                        <Route path='/' element={<Home/>} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </div>
        </div>
    )
}

export default App
