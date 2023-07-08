import React, {useState} from "react";
import CloseIcon from "../../../assets/img/close.png";
import {useForm} from "react-hook-form";
import {createClientWithCar, createOrder} from "../../AutoServiceFetch";

const AddOrder = ({types, modal}) => {
    const [newModal, setNewModal] = useState(modal)
    const {register, handleSubmit} = useForm()

    const onSubmit = (data) => {
        function GetService() {
            let service = []
            data.service.map(s => {
                service.push(parseInt(s))
            })
            return service
        };
        let client = {
            client_name: data.car_client.client_name,
            city: data.car_client.city,
            phone: data.car_client.phone,
            car: {
                name: data.car_client.car.name
            }
        }
        let order = {
            service: GetService()
        }
        console.log(client)
        createClientWithCar(client).then(function (response) {
            console.log(response.status, response.statusText)
            return response.json()
        }).then(function (data) {
            if (data.cl_id) {
                order.car_client = data.cl_id
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
            }
        }).catch(function (e) {
            console.log(e)
        })
    };
    return (
            <form className="form-box_small rounded-3" id="addOrderForm" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="subtitle subtitle_font" style={{textAlign: 'center'}}>Добавление заказа</h2>
                <div className="mb-3 form-select rounded-3 service-types__items">
                    {
                        types && types.map(type =>
                            <div className="form-check" key={type.s_id}>
                                <input
                                    {...register("service")}
                                    className="form-check-input"
                                    type="checkbox"
                                    value={type.s_id}
                                    id={type.s_id}
                                />
                                <label className="form-check-label" htmlFor="${s.type}">{type.type}</label>
                            </div>
                        )
                    }
                </div>
                <div className="form-floating mb-3">
                    <input
                        {...register("car_client.client_name")}
                        type="text"
                        className="form-control"
                        placeholder="Имя и фамилия клиента"
                        id="carClientName"
                    />
                    <label htmlFor="carClientName" className="font-color_dark">Имя и фамилия клиента</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        {...register("car_client.phone")}
                        type="text"
                        className="form-control"
                        id="carClientPhone"
                        placeholder='Телефон клиента'/>
                    <label htmlFor="carClientPhone" className="font-color_dark">Телефон клиента</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        {...register("car_client.city")}
                        type="text"
                        className="form-control"
                        id="carClientCity"
                        placeholder='Город клиента'/>
                    <label htmlFor="carClientCity" className="font-color_dark">Город клиента</label>
                </div>
                <div className="form-floating">
                    <input
                        {...register("car_client.car.name")}
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