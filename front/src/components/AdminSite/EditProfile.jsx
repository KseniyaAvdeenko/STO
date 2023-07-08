import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {editProfile} from "../AutoServiceFetch";

const EditProfile = ({user, token, modal}) => {
    const [newModal, setNewModal] = useState(modal)

    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        console.log(data)
        editProfile(token, data).then(function (response) {
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
        <form className="form-box_small rounded-3" id="editUserForm" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="subtitle subtitle_font" style={{textAlign: 'center'}}>Изменение профиля</h2>
            <div className="form-floating mb-3">
                <input
                    {...register("last_name", {value: user.last_name})}
                    className="form-control"
                    type="text"
                    id="lastNameUser"
                    placeholder="Фамилия"
                    // list="last_name"
                />
                {/*<datalist id="last_name">*/}
                {/*    <option>{user.last_name}</option>*/}
                {/*</datalist>*/}
                <label htmlFor="lastNameUser" className="font-color_dark">Фамилия</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    {...register("first_name", {value: user.first_name})}
                    className="form-control"
                    type="text"
                    id="firstNameUser"
                    placeholder='Имя'
                    // list={user.first_name}
                />
                {/*<datalist id={user.first_name}>*/}
                {/*    <option>{user.first_name}</option>*/}
                {/*</datalist>*/}
                <label htmlFor="firstNameUser" className="font-color_dark">Имя</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    {...register("username", {value: user.username})}
                    className="form-control"
                    type="text"
                    placeholder='Логин'
                    id="usernameUser"
                    // list={user.username}
                />
                {/*<datalist id={user.username}>*/}
                {/*    <option>{user.username}</option>*/}
                {/*</datalist>*/}
                <label htmlFor="usernameUser" className="font-color_dark">Логин</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    {...register("email", {value: user.email})}
                    className="form-control"
                    type="text"
                    placeholder='Эл. почта'
                    id="emailUser"
                    // list={user.email}
                />
                {/*<datalist id={user.email}>*/}
                {/*    <option>{user.email}</option>*/}
                {/*</datalist>*/}
                <label htmlFor="emailUser" className="font-color_dark">Эл. почта</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    {...register("phone", {value: user.email})}
                    className="form-control"
                    type="text"
                    placeholder='Телефон'
                    id="phoneUser"
                    // list={user.phone}
                />
                {/*<datalist id={user.phone}>*/}
                {/*    <option>{user.phone}</option>*/}
                {/*</datalist>*/}
                <label htmlFor="phoneUser" className="font-color_dark">Телефон</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    {...register("tg_login", {value: user.tg_login, required:true})}
                    className="form-control"
                    type="text"
                    placeholder='Телеграм логин'
                    id="tgLogin"
                />
                <label htmlFor="tgLogin" className="font-color_dark">Телеграм логин</label>
            </div>
            <button type="submit" className="btn btn-secondary mt-3">Сохранить</button>
        </form>
    )
};
export default EditProfile;