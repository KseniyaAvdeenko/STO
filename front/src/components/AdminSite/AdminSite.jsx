import React, {useState} from "react";
import TickIcon from "../../assets/img/tick.png";
import CrossIcon from "../../assets/img/cross.png";
import EditProfile from "./EditProfile";
import Modal from "../UI/Modal/Modal";


export function AdminSite({user, token}) {
    const [modal, setModal] = useState(false)

    return (
        <main className="container admin-main" style={{width: "100%"}}>
            <Modal visible={modal} setVisible={setModal}>
                <EditProfile user={user} token={token} modal={modal}/>
            </Modal>
            <h1 className="title title_font mb-4" style={{textAlign: "center"}}>Админ-сайт</h1>
            <div id="profile" className="d-flex justify-content-center">
                <div className="card" style={{width: "26rem"}}>
                    <div className="card-body">
                        <h5 className="card-title" style={{textAlign: "center"}}><b>{user.username}</b></h5>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b>Фамилия и имя:</b>  {user.last_name} {user.first_name}
                        </li>
                        <li className="list-group-item"><b>Эл. почта:</b>  {user.email}</li>
                        <li className="list-group-item"><b>Телефон:</b>  {user.phone}</li>
                        {
                            user.tg_login === null
                                ? <li className="list-group-item"><b>Телеграм Логин: </b>Заполните, пожалуйста</li>
                                : <li className="list-group-item"><b>Телеграм Логин: </b>{user.tg_login}</li>
                        }
                        {
                            user.tg_id === "" && user.tg_login !== null
                                ? <li className="list-group-item">
                                    <b>ТелеграмID: </b>
                                    <a href="https://t.me/AutoServiceSTOBot" className="btn btn-info ms-2">Заполнить поле</a>
                                </li>
                                : <li className="list-group-item"><b>ТелеграмID: </b>{user.tg_id}</li>
                        }

                        <li className="list-group-item">
                            <b>Сотрудник:</b>
                            {
                                user.is_employee
                                    ? <img src={TickIcon} className="position-in_cell ms-2" alt='tick'/>
                                    : <img className="position-in_cell ms-2" src={CrossIcon} alt="cross"/>
                            }
                        </li>
                        <li className="list-group-item">
                            <b>Админ:</b>
                            {
                                user.is_staff
                                    ? <img src={TickIcon} className="position-in_cell ms-2" alt='tick'/>
                                    : <img className="position-in_cell ms-2" src={CrossIcon} alt="cross"/>
                            }
                        </li>
                    </ul>
                    <div className="d-flex justify-content-evenly py-3 px-2">
                        <button type="button" className="btn btn-warning" onClick={() => setModal(true)}>Изменить
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
;