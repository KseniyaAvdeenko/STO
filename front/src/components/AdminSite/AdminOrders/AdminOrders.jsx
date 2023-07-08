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

    return (
        <main className="container" style={{minHeight: "80vh"}}>
            <div className='admin_orders' id="adminOrders" style={{width: "100%"}}>
                <Modal visible={modal} setVisible={setModal}>
                    <AddOrder types={types} modal={modal}/>
                </Modal>

                <div className="d-flex flex-column justify-content-center align-items-end ">
                    <div className="d-flex justify-content-end align-items-baseline heading_container">
                        <h4 className="display-4 fw-semibold text-center mt-3 mb-4"> Заказы </h4>
                        <button className="btn btn-success button_position" onClick={()=>setModal(true)}>+ Добавить</button>
                    </div>
                    <table className="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Дата</th>
                            <th scope="col">Данные клиента</th>
                            <th scope="col">Диагностика</th>
                            <th scope="col">На обслуживании</th>
                            <th scope="col">Обслуживание завершено</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody id='ordersTbody'>
                        {
                            orders && orders.map(order =>
                                <tr key={order.so_id}>
                                    <th scope="row">{order.so_id}</th>
                                    <td>{order.order_date}</td>
                                    <td>
                                        {order.car_client.client_name}<br/>
                                        {order.car_client.city}<br/>
                                        {order.car_client.phone}<br/>
                                        {order.car_client.car.name}
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
                                    <td><a href={`${order.so_id}/`} className="btn btn-info" id="editBtn">Детали заказа</a>
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