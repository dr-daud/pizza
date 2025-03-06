import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import PizzaBlock from "../components/pizza-block/pizza-block";
import Skeleton from "../components/skeleton/skeleton";
import Categories from "../components/categories/categories";
import Sort from "../components/sort/sort";
import Pagination from "../components/pagination/pagination";
import { setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas, setItems } from "../redux/slices/pizzaSlice";
import { list } from "../components/sort/sort";

const Home = () => {
	const navigate = useNavigate();
	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const { categoryId, sort, currentPage, searchValue } = useSelector(
		(state) => state.filter
	);
	const { status, items } = useSelector((state) => state.pizza);
	const dispatch = useDispatch();

	const getPizzas = () => {
		const sortBy = sort.sortProperty.replace("-", "");
		const order = sort.sortProperty.includes("-") ? "desc" : "asc";
		const category = categoryId > 0 ? `&category=${categoryId}` : "";
		const search = searchValue ? `&search=${searchValue}` : "";

		dispatch(
			fetchPizzas({
				currentPage,
				sortBy,
				order,
				category,
				search,
			})
		);

		window.scrollTo(0, 0);
	};

	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});

			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sort, searchValue, currentPage]);

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

			dispatch(
				setFilters({
					...params,
					sort,
				})
			);
			isSearch.current = true;
		}
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);

		if (!isSearch.current) {
			getPizzas();
		}

		isSearch.current = false;
	}, [categoryId, sort, searchValue, currentPage]);

	const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
	const skeletons = [...new Array(10)].map((_, index) => (
		<Skeleton key={index} />
	));

	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{status === "error" ? (
				<div style={{ textAlign: "center" }}>
					<h2 style={{ marginBottom: "15px" }}>Ошибка загрузки😕</h2>
					<p>Не удалось загрузить список пицц. Попробуйте позже.</p>
				</div>
			) : (
				<div className="content__items">
					{" "}
					{status === "loading" ? skeletons : pizzas}{" "}
				</div>
			)}
			{status !== "error" && (
				<Pagination
					onChangePage={(number) => dispatch(setCurrentPage(number))}
				/>
			)}
		</div>
	);
};

export default Home;
