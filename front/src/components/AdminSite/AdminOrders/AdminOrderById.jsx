import CrossIcon from "../../../assets/img/cross.png";
import TickIcon from "../../../assets/img/tick.png";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import EditOrder from "./EditOrder"
import {deleteOrder, getOrderById} from "../../AutoServiceFetch";
import Modal from "../../UI/Modal/Modal";

const AdminOrderById = ({types}) => {
    const [modal, setModal] = useState(false)
    let {orderId} = useParams()
    const [order, setOrder] = useState({})
    useEffect(() => {
        getOrderById(orderId).then(data => setOrder(data))
    }, [orderId])

    function getSum(array) {
        let sum = 0
        array && array.map(s => {
            sum += s.price
        })
        return sum.toFixed(2)
    }

    function getClient(obj) {
        let client = {}
        Object.values(obj).map((value) => [value])[6] && Object.values(obj).map((value) => [value])[6].map(result => {
            client = result
        })
        return client
    };

    function DeleteOrder() {
        deleteOrder(orderId).then(function (res) {
            if (res.status === 200) {
                window.location.replace('http://127.0.0.1:3000/admin-site/orders/')
            }
            return res.json()
        }).catch(e => console.log(e))
    }

    return (
        <main className="container" style={{minHeight: "80vh"}}>
            <Modal visible={modal} setVisible={setModal}>
                <EditOrder
                    orderId={orderId}
                    order={order}
                    types={types}
                    getClient={getClient}
                    modal={modal}
                />
            </Modal>
            <div className="back"><Link to="http://127.0.0.1:3000/admin-site/orders/">&larr; Назад</Link></div>
            <div className="d-flex justify-content-center align-items-center" id="orderContainer"
                 style={{margin: "200px auto"}}>
                <div className="card" style={{width: "26rem"}}>
                    <div className="d-flex flex-column align-items-center py-3 px-2">
                        <h5 className="card-4 fs-4 fw-bold">Заказ № {order._id}</h5>
                        <p className="card-text fw-normal">Дата
                            оформления: {typeof order.order_date === "string" ? order.order_date.slice(0, 10) : order.order_date}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            {
                                order.client && order.client.map(client => <div key={client._id}>
                                    <b>Имя клиента:</b> {client.name}<br/>
                                    <b>Телефон:</b> {client.phone}<br/>
                                    <b>Город:</b> {client.city}<br/>
                                    <b>Авто:</b> {client.car}<br/>
                                </div>)
                            }
                        </li>
                        <li className="list-group-item">
                            <b>Вид обслуживания:</b><br/>
                            {
                                order.service && order.service.map(service =>
                                    <p key={service._id}>{service.type} - {service.price} BYN<br/></p>)
                            }
                            <hr/>
                            <b>Итого:</b> {getSum(order.service)} BYN
                        </li>
                        <li className="list-group-item">
                            <b>Диагностика:</b>
                            {
                                order.diagnosis
                                    ? <img src={TickIcon} className="position-in_cell" alt='tick'/>
                                    : <img className="position-in_cell" src={CrossIcon} alt="cross"/>
                            }
                        </li>
                        <li className="list-group-item">
                            <b>На обслуживании:</b>
                            {
                                order.in_progress
                                    ? <img src={TickIcon} className="position-in_cell" alt='tick'/>
                                    : <img className="position-in_cell" src={CrossIcon} alt="cross"/>
                            }
                        </li>
                        <li className="list-group-item">
                            <b>Обслуживание завершено:</b>
                            {
                                order.is_finished
                                    ? <img src={TickIcon} className="position-in_cell" alt='tick'/>
                                    : <img className="position-in_cell" src={CrossIcon} alt="cross"/>
                            }
                        </li>
                    </ul>
                    <div className="d-flex justify-content-evenly py-3 px-2">
                        <button type="button" className="btn btn-warning" onClick={() => setModal(true)}>Изменить
                        </button>
                        <button type="button" className="btn btn-danger" onClick={DeleteOrder}>Удалить</button>
                    </div>
                </div>
            </div>
        </main>
    )
};
export default AdminOrderById;