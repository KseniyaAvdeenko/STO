import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {deleteClient, getClientById} from "../../AutoServiceFetch";
import EditClient from "./EditClient";
import Modal from "../../UI/Modal/Modal";

const AdminClientsById = () => {
    let {clientId} = useParams();
    const [client, setClient] = useState({})
    const [modal, setModal] = useState(false)
    useEffect(()=>{
        getClientById(clientId).then(data => setClient(data))
    }, [clientId])

    function DeleteClient() {
        deleteClient(clientId).then(function (res){
            console.log(res.status, res.statusText)
            if (res.status === 200){
                window.location.replace('http://127.0.0.1:3000/admin-site/clients/')
            }
            return res.json()
        })
    }

    return (
        <main className="container admin-main" style={{minHeight: "80vh"}}>
            <Modal visible={modal} setVisible={setModal}>
                <EditClient clientId={clientId} client={client} modal={modal}/>
            </Modal>
            <div className="back"><Link to="http://127.0.0.1:3000/admin-site/clients/">&larr; Назад</Link></div>
            <div className='admin_clients' style={{margin: "200px auto"}}>
                <div className="card" style={{width: "26rem"}}>
                    <div className="d-flex flex-column align-items-center py-3 px-2">
                        <h5 className="card-title fs-4 fw-bold">Клиент: {client.client_name}</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b>Телефон:</b> {client.phone}</li>
                        <li className="list-group-item"><b>Город:</b> {client.city}</li>
                        {/*<li className="list-group-item"><b>Авто:</b> {client.car.name}</li>*/}
                    </ul>
                    <div className="d-flex justify-content-evenly py-3 px-2">
                        <button type="button" className="btn btn-warning" id="editClientBtn" onClick={()=>setModal(true)}>Изменить</button>
                        <button type="button" className="btn btn-danger" id="deleteClientBtn" onClick={DeleteClient}>Удалить</button>
                    </div>
                </div>
            </div>
        </main>
    )
};
export default AdminClientsById;