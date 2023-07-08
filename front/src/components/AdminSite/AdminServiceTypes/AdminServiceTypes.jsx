import AddServiceType from "./AddServiceType";
import {useMemo, useState} from "react";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal/Modal";

export function AdminServiceTypes({types}) {
    const [modal, setModal] = useState(false)
    const [searchTypesQuery, setSearchTypesQuery] = useState("")
    const searchedTypes = useMemo(() => {
        return types && types.filter(type => type.type.toLowerCase().includes(searchTypesQuery))
    }, [searchTypesQuery, types])
    return (
        <main className="container" style={{minHeight: "80vh"}}>
            <div className='admin_service' id="adminService">
                <div className="d-flex flex-column justify-content-center align-items-end">
                    <div className="d-flex justify-content-end align-items-baseline heading_container">
                        <h4 className="display-4 fw-semibold text-center mt-3 mb-4"> Виды обслуживания </h4>
                        <button className="btn btn-success button_position" onClick={()=>setModal(true)}>+ Добавить</button>
                    </div>
                    <Modal visible={modal} setVisible={setModal}>
                        <AddServiceType modal={modal}/>
                    </Modal>
                    <div className="d-flex justify-content-start align-items-center" style={{width: "100%"}}>
                        <Input
                            onChange={(e) => setSearchTypesQuery(e.target.value)}
                            value={searchTypesQuery}
                            placeholder="Поиск"
                            type="text" className="form-control my-3 text-dark-emphasis"
                            style={{width: "25%"}}/>
                    </div>
                    <table className="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Вид обслуживания</th>
                            <th scope="col">Цена, BYN</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody id="serviceTbody">
                        {
                            searchedTypes && searchedTypes.map(type =>
                                <tr key={type.s_id}>
                                    <td>{type.s_id}</td>
                                    <td>{type.type}</td>
                                    <td>{type.price}</td>
                                    <td>
                                        <a href={`${type.s_id}/`} className="btn btn-info">Изменить/Удалить</a></td>
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