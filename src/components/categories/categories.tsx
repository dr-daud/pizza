import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';

import './categories.scss';

const Categories = () => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    const dispatch = useDispatch();
    const categoryId = useSelector((state: RootState) => state.filter.categoryId);


    return (
        <div className="categories">
            <ul>
                {categories.map((item, i) => (
                    <li key={i} onClick={() => dispatch(setCategoryId(i))} className={categoryId === i ? 'active' : ''}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default Categories;