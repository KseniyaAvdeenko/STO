import React, {useState} from "react";
import CloseIcon from "../../../assets/img/close.png";
import {editClient, editOrder} from "../../AutoServiceFetch";

const EditOrder = ({orderId, order, types, modal}) => {
    const [newModal, setNewModal] = useState(modal)
    // console.log(order)

    const onSubmit = (e) => {
        e.preventDefault()
        let form = e.target
        let orderForEdit = {
            diagnosis: document.getElementById('diagnosis').checked,
            in_progress: document.getElementById('progress').checked,
            is_finished: document.getElementById('finished').checked,
            service: [],
        }
        document.querySelectorAll('input[type="checkbox"]').forEach(cInput => {
            if (cInput.checked) {
                orderForEdit.service.push(parseInt(cInput.value))
            }
        })
        console.log(orderForEdit)
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
    };
    return (
        <form className="form-box_small rounded-3" id="editForm" style={{width: '80%'}} onSubmit={onSubmit}>
            <h2 className="subtitle subtitle_font" style={{textAlign: 'center'}}>Изменение заказа</h2>
            <div className="mb-3 form-select rounded-3 service-types__items">
                {
                    types && types.map(type =>
                        <div className="form-check" key={type._id}>
                            <input className="form-check-input" type="checkbox" value={type._id} id={type.type}/>
                            <label className="form-check-label" htmlFor={type.type}>{type.type}</label>
                        </div>
                    )
                }
            </div>
            <div className="d-flex flex-column align-items-start my-3" id="OrderStatus">
                <div className="form-check">
                    <input
                        defaultChecked={order.diagnosis}
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
                        defaultChecked={order.in_progress}
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
                        defaultChecked={order.is_finished}
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