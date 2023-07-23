import React, {useState} from "react";
import CloseIcon from "../../../assets/img/close.png";
import {useForm} from "react-hook-form";
import {createClientWithCar, createOrder, editClientOrder, getServiceById} from "../../AutoServiceFetch";
import {Link} from "react-router-dom";

const AddOrder = ({types, modal, clients}) => {
    const [newModal, setNewModal] = useState(modal)
    const {register, handleSubmit} = useForm()
    const onSubmit = (data) => {
        function GetServiceTypes() {
            let serviceTypes = [];
            data.types.map(id => {
                serviceTypes.push(parseInt(id))
            });
            return serviceTypes
        }

        let order = {
            _id: Date.now(),
            diagnosis: true,
            in_progress: false,
            is_finished: false,
            service: GetServiceTypes(),
            client: parseInt(data.client)
        }
        // console.log(order._id)
        // console.log(order.client)
        let order_num = {orders: order._id}
        createOrder(order).then(function (res) {
            if (res.status === 201) {
                editClientOrder(order.client, order_num).then(function (res) {
                    console.log(res.status)
                    return res.json()
                })
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
            <select className="form-select mb-3" {...register('client')}>
                <option>Выберите клиента</option>
                {
                    clients && clients.map(client =>
                        <option key={client._id} value={client._id}>
                            {client.name} {client.phone} {client.car}
                        </option>
                    )
                }
            </select>
            <p>Нет нужного клиента?
                <Link to="http://127.0.0.1:3000/admin-site/clients/"> Добавьте нового</Link>
            </p>

            {/*<div className="form-floating mb-3">*/}
            {/*    <input*/}
            {/*        {...register("client.name")}*/}
            {/*        type="text"*/}
            {/*        className="form-control"*/}
            {/*        placeholder="Имя и фамилия клиента"*/}
            {/*        id="carClientName"*/}
            {/*    />*/}
            {/*    <label htmlFor="carClientName" className="font-color_dark">Имя и фамилия клиента</label>*/}
            {/*</div>*/}
            {/*<div className="form-floating mb-3">*/}
            {/*    <input*/}
            {/*        {...register("client.phone")}*/}
            {/*        type="text"*/}
            {/*        className="form-control"*/}
            {/*        id="carClientPhone"*/}
            {/*        placeholder='Телефон клиента'/>*/}
            {/*    <label htmlFor="carClientPhone" className="font-color_dark">Телефон клиента</label>*/}
            {/*</div>*/}
            {/*<div className="form-floating mb-3">*/}
            {/*    <input*/}
            {/*        {...register("client.city")}*/}
            {/*        type="text"*/}
            {/*        className="form-control"*/}
            {/*        id="carClientCity"*/}
            {/*        placeholder='Город клиента'/>*/}
            {/*    <label htmlFor="carClientCity" className="font-color_dark">Город клиента</label>*/}
            {/*</div>*/}
            {/*<div className="form-floating">*/}
            {/*    <input*/}
            {/*        {...register("client.car")}*/}
            {/*        type="text"*/}
            {/*        className="form-control"*/}
            {/*        id="CarClientCar"*/}
            {/*        placeholder='Марка и модель авто клиента'/>*/}
            {/*    <label htmlFor="CarClientCar" className="font-color_dark">Марка и модель авто клиента</label>*/}
            {/*</div>*/}
            <button type="submit" className="btn btn-secondary mt-3">Создать</button>
        </form>
    )
};
export default AddOrder;