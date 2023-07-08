import CloseIcon from "../../../assets/img/close.png";
import {useForm} from "react-hook-form";
import {editEmployee} from "../../AutoServiceFetch";
import React, {useState} from "react";

const EditEmployee = ({token, userId, user, modal}) => {
    const [newModal, setNewModal] =useState(modal)
    const {register, handleSubmit} = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        editEmployee(userId, token, data).then(function (response) {
            console.log(response.status, response.statusText)
            if (response.status === 200) {
                window.location.reload()
            }
            return response.json()
        }).catch(function (e) {
            console.log(e)
            setNewModal(false)
        })
    };

    return (
            <form className="form-box_small rounded-3" id="editEmployeeForm" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="subtitle subtitle_font" style={{textAlign: 'center'}}>Изменение данных сотрудника</h2>
                <div className="form-floating mb-3">
                    <input {...register("last_name", {value: user.last_name})} type="text" className="form-control"
                           id="last_name" placeholder='Фамилия'/>
                    <label htmlFor="last_name">Фамилия</label>
                </div>
                <div className="form-floating mb-3">
                    <input {...register("first_name", {value: user.first_name})} type="text" className="form-control"
                           id="first_name" placeholder='Имя'/>
                    <label htmlFor="first_name">Имя</label>
                </div>
                <div className="form-floating mb-3">
                    <input {...register("username", {value: user.username, required: true})} type="text"
                           className="form-control" placeholder='Логин' id="username"/>
                    <label htmlFor="username">Логин</label>
                </div>
                <div className="form-floating mb-3">
                    <input {...register("email", {value: user.email, required: true})} type="text"
                           className="form-control" placeholder='Эл. почта' id="email"/>
                    <label htmlFor="email">Эл. почта</label>
                </div>
                <div className="form-floating mb-3">
                    <input {...register("phone", {value: user.phone})} type="text" className="form-control"
                           placeholder='Телефон' id="userPhone"/>
                    <label htmlFor="phone">Телефон</label>
                </div>
                <div className="form-floating mb-3">
                    <input {...register("tg_id", {value: user.tg_id})} type="text" className="form-control"
                           placeholder='Телеграм ID' id="tgId"/>
                    <label htmlFor="tgId">Телеграм ID</label>
                </div>
                <div className="form-check">
                    <input {...register("is_staff", {value: user.is_staff})} className="form-check-input"
                           type="checkbox" id="isAdmin"/>
                    <label className="form-check-label" htmlFor="isAdmin">Админ</label>
                </div>
                <div className="form-check">
                    <input {...register("is_employee", {value: user.is_employee})} className="form-check-input"
                           type="checkbox" id="isEmployee"/>
                    <label className="form-check-label" htmlFor="isEmployee">Сотрудник</label>
                </div>
                <button type="submit" className="btn btn-secondary mt-3">Сохранить</button>
            </form>
)


};
export default EditEmployee;