import { Link } from 'react-router';

import EmptyCart from '../../assets/empty-cart.png';

import './not-found-block.scss';

const NotFoundBlock = () => {
    return (
        <div class="cart cart--empty">
            <h2>Корзина пустая <icon>😕</icon></h2>
            <p>
                Вероятней всего, вы не заказывали ещё пиццу.<br />
                Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img src={EmptyCart} alt="Empty cart" />
            <Link to="/" class="button button--black">
                <span>Вернуться назад</span>
            </Link>
        </div>
    )
}

export default NotFoundBlock;
