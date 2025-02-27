import { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';

import PizzaBlock from '../components/pizza-block/pizza-block';
import Skeleton from '../components/skeleton/skeleton';
import Categories from '../components/categories/categories';
import Sort from '../components/sort/sort';
import Pagination from '../components/pagination/pagination';
import { SearchContext } from '../app/app';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const { searchValue } = useContext(SearchContext);

    const categoryId = useSelector(state => state.filter.categoryId);
    const sort = useSelector(state => state.filter.sort)

    useEffect(() => {
        setIsLoading(true)

        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        fetch(`https://67af4195dffcd88a6786195f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => res.json())
            .then(json => {
                setItems(json)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sort, searchValue, currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
                    : items.map(obj => (<PizzaBlock key={obj.id} {...obj} />))}
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </div>
    )
}

export default Home