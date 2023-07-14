import React, {useState} from "react";
import CloseIcon from "../../../assets/img/close.png";
import {useForm} from "react-hook-form";
import {createClientWithCar, createOrder, getServiceById} from "../../AutoServiceFetch";

const AddOrder = ({types, modal}) => {
    const [newModal, setNewModal] = useState(modal)
    const {register, handleSubmit} = useForm()
    let now = new Date()
    const onSubmit = (data) => {
        function GetServiceTypes() {
            let serviceTypes = [];
            data.types.map(id => {
                types && types.map(type => {
                    if (type._id === parseInt(id)) {
                        serviceTypes.push(type)
                    }
                })
            });
            return serviceTypes
        }

        console.log(GetServiceTypes())
        let order = {
            _id: Date.now(),
            client: data.client,
            diagnosis: true,
            in_progress: false,
            is_finished: false,
            service: GetServiceTypes(),
        }
        console.log(JSON.stringify(order))
        createOrder(order).then(function (res) {
            if (res.status === 201) {
                alert("Заказ создан")
                window.location.reload()
            }
            return res.json()
        }).catch(function (e) {
            console.log(e)
            setNewModal(false)
        })
    };
    return (
        <form className="form-box_small rounded-3" id="addOrderForm" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="subtitle subtitle_font" style={{textAlign: 'center'}}>Добавление заказа</h2>
            <div className="mb-3 form-select rounded-3 service-types__items">
                {
                    types && types.map(type =>
                        <div className="form-check" key={type._id}>
                            <input
                                {...register("types")}
                                className="form-check-input"
                                type="checkbox"
                                value={type._id}
                                id={type._id}
                            />
                            <label className="form-check-label" htmlFor={type._id}>{type.type}</label>
                        </div>
                    )
                }
            </div>
            <div className="form-floating mb-3">
                <input
                    {...register("client.name")}
                    type="text"
                    className="form-control"
                    placeholder="Имя и фамилия клиента"
                    id="carClientName"
                />
                <label htmlFor="carClientName" className="font-color_dark">Имя и фамилия клиента</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    {...register("client.phone")}
                    type="text"
                    className="form-control"
                    id="carClientPhone"
                    placeholder='Телефон клиента'/>
                <label htmlFor="carClientPhone" className="font-color_dark">Телефон клиента</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    {...register("client.city")}
                    type="text"
                    className="form-control"
                    id="carClientCity"
                    placeholder='Город клиента'/>
                <label htmlFor="carClientCity" className="font-color_dark">Город клиента</label>
            </div>
            <div className="form-floating">
                <input
                    {...register("client.car")}
                    type="text"
                    className="form-control"
                    id="CarClientCar"
                    placeholder='Марка и модель авто клиента'/>
                <label htmlFor="CarClientCar" className="font-color_dark">Марка и модель авто клиента</label>
            </div>
            <button type="submit" className="btn btn-secondary mt-3">Создать</button>
        </form>
    )
};
export default AddOrder;