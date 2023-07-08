import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

const SideBar = ({user}) => {
    const {logOut} = useAuth()
    return (
        <aside className="d-flex" style={{minHeight: "100vh"}}>
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-secondary" style={{width: "280px"}}>
                {
                    user.is_staff || user.is_employee
                        ? <ul className="nav nav-pills flex-column mb-auto">
                            <li>
                                <Link to="http://127.0.0.1:3000/" className="nav-link link-body-emphasis">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-house-door me-2" viewBox="0 0 16 16">
                                        <path
                                            d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
                                    </svg>
                                    Главная
                                </Link>
                            </li>
                            <li>
                                <Link to="http://127.0.0.1:3000/admin-site/orders/" className="nav-link link-body-emphasis navigation"
                                   id="navOrders">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-table me-2" viewBox="0 0 16 16">
                                        <path
                                            d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
                                    </svg>
                                    Заказы
                                </Link>
                            </li>
                            {/*<li>*/}
                            {/*    <a href="#" className="nav-link link-body-emphasis navigation"*/}
                            {/*       id="navStats">*/}
                            {/*        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"*/}
                            {/*             className="bi bi-speedometer2 me-2" viewBox="0 0 16 16">*/}
                            {/*            <path*/}
                            {/*                d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/>*/}
                            {/*            <path fillRule="evenodd"*/}
                            {/*                  d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"/>*/}
                            {/*        </svg>*/}
                            {/*        Статистика*/}
                            {/*    </a>*/}
                            {/*</li>*/}
                            <li>
                                <Link to="http://127.0.0.1:3000/admin-site/service/"
                                   className="nav-link link-body-emphasis navigation"
                                   id="navService">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-grid me-2" viewBox="0 0 16 16">
                                        <path
                                            d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
                                    </svg>
                                    Услуги
                                </Link>
                            </li>
                            <li>
                                <Link to="http://127.0.0.1:3000/admin-site/clients/"
                                   className="nav-link link-body-emphasis navigation"
                                   id="navClients">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-person-circle me-2" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                        <path fillRule="evenodd"
                                              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                    </svg>
                                    Клиенты
                                </Link>
                            </li>
                            {
                                user.is_staff
                                    ? <li>
                                        <Link to="http://127.0.0.1:3000/admin-site/employees/"
                                           className="nav-link link-body-emphasis navigation"
                                           id="navEmployees">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                 className="bi bi-person-circle me-2" viewBox="0 0 16 16">
                                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                <path fillRule="evenodd"
                                                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                            </svg>
                                            Сотрудники
                                        </Link>
                                    </li>
                                    : <li></li>
                            }
                            <hr/>
                            <div className="dropdown">
                                <Link to="http://127.0.0.1:3000/admin-site/"
                                   className="d-flex align-items-center justify-content-center p-2 link-body-emphasis text-decoration-none dropdown-toggle text-secondary-emphasis"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                    <b>{user.username}</b>
                                </Link>
                                <ul className="dropdown-menu text-small shadow">
                                    <li>
                                        <Link to="http://127.0.0.1:3000/admin-site/" className="dropdown-item">Профиль</Link>
                                    </li>
                                    <hr/>
                                    <li><button
                                        className="dropdown-item"
                                        id="dropLogoutBtn"
                                        onClick={logOut}
                                    >Выйти
                                    </button>
                                    </li>
                                </ul>
                            </div>
                        </ul>
                        : <ul className="nav nav-pills flex-column mb-auto">
                            <li>
                                <Link to="http://127.0.0.1:3000/" className="nav-link link-body-emphasis">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-house-door me-2" viewBox="0 0 16 16">
                                        <path
                                            d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
                                    </svg>
                                    Главная
                                </Link>
                            </li>
                            <hr/>
                            <ul className="dropdown-menu text-small shadow">
                                <li><Link to="http://127.0.0.1:3000/login/" className="dropdown-item" id="dropLoginBtn">Войти</Link></li>
                                <li><Link className="dropdown-item" to="http://127.0.0.1:3000/signup/">Регистрация</Link></li>
                            </ul>
                        </ul>
                }
            </div>
        </aside>
    )
};
export default SideBar;