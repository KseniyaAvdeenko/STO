import {Link} from "react-router-dom";

const HeaderPrices = () => {
    return (
        <header className="header header_bg">
            <ul className="nav__items">
                <li className="nav__item"><Link to="/" className="nav__link">Главная</Link></li>
                <li className="nav__item"><Link className="nav__link text-light" to="prices/">Цены</Link></li>
            </ul>
        </header>
    );
};
export default HeaderPrices;