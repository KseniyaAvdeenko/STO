import React, {useEffect, useState} from "react";
import AddOrder from "./AddOrder";
import {getOrders} from "../../AutoServiceFetch";
import CrossIcon from "../../../assets/img/cross.png";
import TickIcon from "../../../assets/img/tick.png";
import Modal from "../../UI/Modal/Modal";

export function AdminOrders({types}) {
    const [modal, setModal] = useState(false)
    const [orders, setOrders] = useState([])
    useEffect(() => {
        getOrders().then(data => setOrders(data))

    }, [])

    function getSum(array) {
        let sum = 0
        array && array.map(s => {
            sum += s.price
        })
        return sum
    }

    return (
        <main className="container" style={{minHeight: "80vh"}}>
            <div className='admin_orders' id="adminOrders" style={{width: "100%"}}>
                <Modal visible={modal} setVisible={setModal}>
                    <AddOrder types={types} modal={modal}/>
                </Modal>

                <div className="d-flex flex-column justify-content-center align-items-end ">
                    <div className="d-flex justify-content-end align-items-baseline heading_container">
                        <h4 className="display-4 fw-semibold text-center mt-3 mb-4"> Заказы </h4>
                        <button className="btn btn-success button_position" onClick={() => setModal(true)}>+ Добавить
                        </button>
                    </div>
                    <table className="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">Дата</th>
                            <th scope="col">Данные клиента</th>
                            <th scope="col">Виды обслуживания</th>
                            <th scope="col">Диагностика</th>
                            <th scope="col">На обслуживании</th>
                            <th scope="col">Обслуживание завершено</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody id='ordersTbody'>
                        {
                            orders && orders.map(order =>
                                <tr key={order._id}>
                                    <td>{order.order_date}</td>
                                    <td>
                                        {order.client.name}<br/>
                                        {order.client.city}<br/>
                                        {order.client.phone}<br/>
                                        {order.client.car}
                                    </td>
                                    <td>
                                        {
                                            order.service && order.service.map(type =>
                                                <p key={type._id} style={{margin: "0"}}>{type.type} - {type.price}</p>
                                            )
                                        }
                                        <hr/>
                                        Итого: {getSum(order.service)} BYN
                                    </td>
                                    <td>
                                        {
                                            order.diagnosis
                                                ? <img src={TickIcon} className="position-in_cell" alt='tick'/>
                                                : <img className="position-in_cell" src={CrossIcon} alt="cross"/>

                                        }
                                    </td>
                                    <td>
                                        {
                                            order.in_progress
                                                ? <img src={TickIcon} className="position-in_cell" alt='tick'/>
                                                : <img className="position-in_cell" src={CrossIcon} alt="cross"/>
                                        }
                                    </td>
                                    <td>
                                        {
                                            order.is_finished
                                                ? <img src={TickIcon} className="position-in_cell" alt='tick'/>
                                                : <img className="position-in_cell" src={CrossIcon} alt="cross"/>
                                        }
                                    </td>
                                    <td><a href={`${order._id}/`} className="btn btn-info" id="editBtn">Детали заказа</a>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
};