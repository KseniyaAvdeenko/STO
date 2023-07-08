import {useEffect, useMemo, useState} from "react";
import {getClients} from "../../AutoServiceFetch";
import AddClient from "./AddClient";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal/Modal";

const AdminClients = () => {
    const [modal, setModal] = useState(false)
    const [clients, setClients] = useState([]);
    useEffect(() => {
        getClients().then(data => setClients(data))
    }, [])

    const [searchClientsQuery, setSearchClientsQuery] = useState("")
    const searchedClients = useMemo(() => {
        return clients && clients.filter(client => client.client_name.toLowerCase().includes(searchClientsQuery))
    }, [searchClientsQuery, clients])

    return (
        <main className="container" style={{minHeight: "80vh"}}>
            <div className='admin_clients' id="adminClients" style={{width: "100%"}}>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="d-flex justify-content-end align-items-baseline heading_container">
                        <h4 className="display-4 fw-semibold text-center mt-3 mb-4"> Клиенты </h4>
                        <button className="btn btn-success button_position" onClick={()=>setModal(true)}>+ Добавить</button>
                    </div>
                    <Modal visible={modal} setVisible={setModal}>
                       <AddClient modal={modal}/>
                    </Modal>
                    <div className="d-flex justify-content-start align-items-center" style={{width: "100%"}}>
                        <Input
                            onChange={(e) => setSearchClientsQuery(e.target.value)}
                            value={searchClientsQuery}
                            placeholder="Поиск"
                            type="text" className="form-control my-3 text-dark-emphasis"
                            style={{width: "25%"}}/>
                    </div>
                    <table className="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">Имя и фамилия клиента</th>
                            <th scope="col">Авто клиента</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody id="clientsTbody">
                        {
                            searchedClients && searchedClients.map(cl =>
                                <tr key={cl.cl_id}>
                                    <td>{cl.client_name} </td>
                                    <td>{cl.car.name}</td>
                                    <td><a href={`${cl.cl_id}/`} className="btn btn-info">Посмотреть</a></td>
                                </tr>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
};
export default AdminClients;