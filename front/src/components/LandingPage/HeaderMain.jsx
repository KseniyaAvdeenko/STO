import Logo from "../../assets/img/logo.png";
import GeoLogo from "../../assets/img/geo-logo.png"
import {Link} from "react-router-dom";

function HeaderMain() {
    return (
        <header className="header header_bg">
            <div className="container">
                <div className="header__upper">
                    <div className="logo__items">
                        <img src={Logo} alt="logo"/>
                        <p className="logo__item logo-text_font">Сто в вашем городе</p>
                    </div>
                    <div className="geo__items">
                        <img src={GeoLogo} alt="geo-logo" className="geo__item"/>
                        <div className="geo__item-text">Город, Улица</div>
                    </div>
                    <div className="phones">
                        <div className="phones__items">
                            <p className="phones__item">+375(29)777-77-77</p>
                            <p className="phones__item">+375(44)777-77-77</p>
                            <p className="phones__item">+375(25)777-77-77</p>
                        </div>
                        <div className="work-hours">Ежедневно с 9.00 - 21.00, без выходных</div>
                    </div>
                </div>
                <div className="header__lower">
                    <ul className="nav__items">
                        <li className="nav__item"><Link to="/" className="nav__link text-light">Главная</Link></li>
                        <li className="nav__item"><a data-link="service" className="nav__link smooth">Услуги</a>
                        </li>
                        <li className="nav__item"><a data-link="about" className="nav__link smooth">О компании</a>
                        </li>
                        <li className="nav__item"><a data-link="order" className="nav__link smooth">Заказать
                            услугу</a></li>
                        <li className="nav__item"><Link to="http://127.0.0.1:3000/prices/" className="nav__link">Цены</Link></li>
                    </ul>
                </div>
            </div>
        </header>
    )
};

export default HeaderMain;