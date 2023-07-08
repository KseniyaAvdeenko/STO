import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {deleteService, getServiceById} from "../../AutoServiceFetch";
import EditServiceType from "./EditServiceType";
import Modal from "../../UI/Modal/Modal";

const AdminServiceTypeById = () => {
    const [modal, setModal] = useState(false)
    let {typeId} = useParams()
    const [type, setType] = useState({})
    useEffect(() => {
        getServiceById(typeId).then(data => setType(data))
    }, [typeId])

    function DeleteService() {
        deleteService(typeId).then(function (res) {
            console.log(res.status, res.statusText)
            if (res.status === 200) {
                window.location.replace('http://127.0.0.1:3000/admin-site/service/')
            }
            return res.json()
        })
    };
    return (
        <main className="container admin-main" style={{minHeight: "80vh"}}>
            <Modal visible={modal} setVisible={setModal}>
                <EditServiceType typeId={typeId} type={type} modal={modal}/>
            </Modal>
            <div className="back"><Link to="http://127.0.0.1:3000/admin-site/service/">&larr; Назад</Link></div>
            <div className="d-flex justify-content-center align-items-center" style={{margin: "200px auto"}}>
                <div className="card" style={{width: "26rem"}}>
                    <div className="d-flex flex-column align-items-center py-3 px-2">
                        <h5 className="card-title fs-4 fw-bold">№ {type.s_id}</h5>
                        <p className="card-text fw-normal" style={{textAlign: "center"}}>Вид
                            обслуживания: {type.type}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b>Цена:</b> {type.price} BYN</li>
                    </ul>
                    <div className="d-flex justify-content-evenly py-3 px-2">
                        <button type="button" className="btn btn-warning" onClick={()=>setModal(true)}>Изменить</button>
                        <button type="button" className="btn btn-danger" onClick={DeleteService}>Удалить</button>
                    </div>
                </div>
            </div>
        </main>

    )
};
export default AdminServiceTypeById;