import { useState, useEffect, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs'
import { useNavigate } from 'react-router-dom';

import PizzaBlock from '../components/pizza-block/pizza-block';
import Skeleton from '../components/skeleton/skeleton';
import Categories from '../components/categories/categories';
import Sort from '../components/sort/sort';
import Pagination from '../components/pagination/pagination';
import { SearchContext } from '../app/app';
import { setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { list } from '../components/sort/sort';

const Home = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { searchValue } = useContext(SearchContext);
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const categoryId = useSelector(state => state.filter.categoryId);
    const sort = useSelector(state => state.filter.sort);
    const currentPage = useSelector(state => state.filter.currentPage);
    const dispatch = useDispatch();

    const fetchPizzas = async () => {
        setIsLoading(true)

        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';
        const category = categoryId > 0 ? `&category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        try {
            const res = await axios.get(`https://67af4195dffcd88a6786195f.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
            setItems(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }

        window.scrollTo(0, 0);
    }

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            })

            navigate(`?${queryString}`)
        }
        isMounted.current = true;
    }, [categoryId, sort, searchValue, currentPage])

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = list.find(obj => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            );
            isSearch.current = true;
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            fetchPizzas();
        }

        isSearch.current = false;
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
                    : items.map ? items.map(obj => (<PizzaBlock key={obj.id} {...obj} />)) : null}
            </div>
            <Pagination onChangePage={(number) => dispatch(setCurrentPage(number))} />
        </div>
    )
}

export default Home