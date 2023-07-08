import Logo from "../../assets/img/logo.png";

const HeaderAdmin = () => {
    return (
        <header className="d-flex flex-wrap align-items-center justify-content-center py-3 border-bottom bs-body-bg">
            <div className="container d-flex align-items-center justify-content-center">
                {/*Автосервис*/}
                <div className="logo__items">
                    <img src={Logo} alt="logo"/>
                    <p className="logo__item logo-text_font">Админ-сайт</p>
                </div>
            </div>
            {/*<div className="container d-flex flex-wrap align-items-center justify-content-end">*/}
            {/*    {*/}
            {/*        user*/}
            {/*            ? <ul className="nav text-small shadow">*/}
            {/*                <li className="nav-item">*/}
            {/*                    <button*/}
            {/*                        className="nav-link text-dark-emphasis"*/}
            {/*                        id="logoutBtn"*/}
            {/*                        // onClick={()=> LogOut()}*/}
            {/*                    >Выйти</button>*/}
            {/*                </li>*/}
            {/*            </ul>*/}
            {/*            : <ul className="nav text-small shadow">*/}
            {/*                <li className="nav-item">*/}
            {/*                    <a href="http://localhost:3000/login/" className="nav-link text-dark-emphasis" id="loginBtn">Войти</a>*/}
            {/*                </li>*/}
            {/*                <li className="nav-item">*/}
            {/*                    <a href="http://localhost:3000/signup/" className="nav-link text-dark-emphasis" id="regBtn">Регистрация</a>*/}
            {/*                </li>*/}
            {/*            </ul>*/}
            {/*    }*/}
            {/*</div>*/}
        </header>
    )
};
export default HeaderAdmin;