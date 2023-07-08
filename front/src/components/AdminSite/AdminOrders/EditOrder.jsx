import React, {useState} from "react";
import CloseIcon from "../../../assets/img/close.png";
import {editClient, editOrder} from "../../AutoServiceFetch";

const EditOrder = ({orderId, order, types, getClient, getCar, modal}) => {
    const [newModal, setNewModal] = useState(modal)

    const onSubmit = (e) => {

        e.preventDefault()
        let form = e.target
        let client = {
            client_name: form.client_name.value,
            phone: form.phone.value,
            city: form.city.value,
            car: {
                car_id: getCar(getClient(order)).car_id,
                name: form.car.value
            }
        }

        let orderForEdit = {
            order_date: order.order_date,
            car_client: getClient(order).cl_id,
            diagnosis: document.getElementById('diagnosis').checked,
            in_progress: document.getElementById('progress').checked,
            is_finished: document.getElementById('finished').checked,
            service: []
        }
        document.querySelectorAll('input[type="checkbox"]').forEach(cInput => {
            if (cInput.checked) {
                orderForEdit.service.push(parseInt(cInput.value))
            }
        })

        console.log(orderForEdit)
        console.log(client)
        editClient(getClient(order).cl_id, client).then(function (res) {
            if (res.status === 200) {
                editOrder(orderId, orderForEdit).then(function (response) {
                    if (response.status === 200) {
                        alert("Данные текущего заказа изменены успешно!")
                        window.location.reload()
                    }
                    return response.json()
                }).catch(function (e) {
                    console.log(e)
                    alert("Ошибка в изменении данных текущего заказа")
                    setNewModal(false)
                })
            }
            return res.json()
        }).catch(function (e) {
            console.log(e)
            alert("Ошибка в изменении данных клиента данного заказа")

        })
    };
    return (
            <form className="form-box_small rounded-3" id="editForm" onSubmit={onSubmit}>
                <h2 className="subtitle subtitle_font" style={{textAlign: 'center'}}>Изменение заказа</h2>
                <div className="mb-3 form-select rounded-3 service-types__items">
                    {
                        types && types.map(type =>
                            <div className="form-check" key={type.s_id}>
                                <input className="form-check-input" type="checkbox" value={type.s_id} id={type.type}/>
                                <label className="form-check-label" htmlFor={type.type}>{type.type}</label>
                            </div>
                        )
                    }
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="client_name"
                        className="form-control"
                        placeholder="Имя и фамилия клиента"
                        id="clientName"/>
                    <label htmlFor="clientName" className="font-color_dark">Имя и фамилия клиента</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="phone"
                        className="form-control"
                        id="orderClientPhone"
                        placeholder='Телефон клиента'/>
                    <label htmlFor="orderClientPhone" className="font-color_dark">Телефон клиента</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        name="city"
                        type="text"
                        className="form-control"
                        id="clientCity"
                        placeholder='Город клиента'
                    />
                    <label htmlFor="clientCity" className="font-color_dark">Город клиента</label>
                </div>
                <div className="form-floating">
                    <input
                        name="car"
                        type="text"
                        className="form-control"
                        id="clientCar"
                        placeholder='Марка и модель авто клиента'/>
                    <label htmlFor="clientCar" className="font-color_dark">Марка и модель авто клиента</label>
                </div>
                <div className="d-flex flex-column align-items-start my-3" id="OrderStatus">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="status"
                            id="diagnosis"
                        />
                        <label className="form-check-label" htmlFor="diagnosis">
                            Диагностика
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="status"
                            id="progress"/>
                        <label className="form-check-label" htmlFor="progress">
                            На обслуживании
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="status"
                            id="finished"
                        />
                        <label className="form-check-label" htmlFor="finished">
                            Обслуживание закончено
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-secondary mt-3">Сохранить</button>
            </form>
    )
};
export default EditOrder;