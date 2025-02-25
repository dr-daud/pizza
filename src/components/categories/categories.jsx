import './categories.scss';

const Categories = ({ value, onClickCategory }) => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className="categories">
            <ul>
                {categories.map((item, i) => (
                    <li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default Categories;