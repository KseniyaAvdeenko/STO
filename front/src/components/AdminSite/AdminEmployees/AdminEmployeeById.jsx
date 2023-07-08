import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import CrossIcon from "../../../assets/img/cross.png";
import TickIcon from "../../../assets/img/tick.png";
import EditEmployee from "./EditEmployee";
import {deleteEmployee, editEmployee, getEmployeeById} from "../../AutoServiceFetch";
import Modal from "../../UI/Modal/Modal";

const AdminEmployeeById = ({token}) => {
    let {userId} = useParams();
    const [modal, setModal] = useState(false);
    const [user, setUser] = useState({})
    useEffect(() => {
        getEmployeeById(userId, token).then(data => setUser(data))
    }, [])

    function DeleteUser() {
        deleteEmployee(userId, token).then(function (res) {
            console.log(res.status, res.statusText)
            if (res.status === 204) {
                window.location.replace('http://127.0.0.1:3000/admin-site/employees/')
            }
            return res.json()
        })
    }

    // console.log(user)
    return (
        <main className="container admin-main">
            <Modal visible={modal} setVisible={setModal}>
                <EditEmployee token={token} userId={userId} user={user}/>
            </Modal>
            <div className="back"><a
                href="front/src/components/AdminSite/AdminEmployees/AdminEmployeeById">&larr; Назад</a></div>
            <div className="d-flex justify-content-center align-items-center" style={{margin: "200px auto"}}
                 id="employeesContainer">

                <div className="card" style={{width: "26rem"}}>
                    <div className="d-flex flex-column align-items-center py-3 px-2">
                        <h5 className="card-title fs-4 fw-bold">{user.username}</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b>Фамилия:</b> {user.last_name}</li>
                        <li className="list-group-item"><b>Имя:</b> {user.first_name}</li>
                        <li className="list-group-item"><b>Логин:</b> {user.username}</li>
                        <li className="list-group-item"><b>Телефон:</b> {user.phone}</li>
                        <li className="list-group-item"><b>Эл. почта:</b> {user.email}</li>
                        <li className="list-group-item"><b>Телеграм ID:</b> {user.tg_id}</li>
                        <li className="list-group-item"><b>Дата регистрации:</b> {user.date_joined}</li>
                        <li className="list-group-item"><b>Админ:</b>
                            {
                                user.is_staff
                                    ? <img src={TickIcon} className="position-in_cell" alt='tick'/>
                                    : <img className="position-in_cell" src={CrossIcon} alt="cross"/>
                            }
                        </li>
                        <li className="list-group-item"><b>Сотрудник:</b>
                            {
                                user.is_employee
                                    ? <img src={TickIcon} className="position-in_cell" alt='tick'/>
                                    : <img className="position-in_cell" src={CrossIcon} alt="cross"/>
                            }
                        </li>
                    </ul>
                    <div className="d-flex justify-content-evenly py-3 px-2">
                        <button type="button" className="btn btn-warning" id="editEmployeeBtn"
                                onClick={() => setModal(true)}>Изменить
                        </button>
                        <button type="button" className="btn btn-danger" id="deleteEmployeeBtn"
                                onClick={DeleteUser}>Удалить
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
};
export default AdminEmployeeById;