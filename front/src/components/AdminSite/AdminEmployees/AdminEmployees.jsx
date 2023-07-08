import {useEffect, useMemo, useState} from "react";
import {getEmployees} from "../../AutoServiceFetch";
import Input from "../../UI/Input";


const AdminEmployees = ({token}) => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        getEmployees(token).then(data => setUsers(data))
    }, [token])
    const [searchEmployeesQuery, setSearchEmployeesQuery] = useState("")
    const searchedEmployees = useMemo(() => {
        return users && users.filter(user => user.username.toLowerCase().includes(searchEmployeesQuery))
    }, [searchEmployeesQuery, users])
    const [searchUsersQuery, setSearchUsersQuery] = useState("")
    const searchedUsers = useMemo(() => {
        return users && users.filter(user => user.username.toLowerCase().includes(searchUsersQuery))
    }, [searchUsersQuery, users])
    return (
        <main className="container admin-main">
            <div className='admin_employees px-3' id="adminEmployees">
                <div className="d-flex flex-column">
                    <h4 className="display-4 fw-semibold text-center mt-3 mb-4"> Сотрудники и пользователи</h4>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column" id="employeesTable" style={{width: "470px"}}>
                            <h5 className="display-5 fw-semibold text-center mt-2 mb-3">Сотрудники</h5>
                            <div className="d-flex justify-content-start align-items-center" style={{width: "100%"}}>
                                <Input
                                    onChange={(e) => setSearchEmployeesQuery(e.target.value)}
                                    value={searchEmployeesQuery}
                                    placeholder="Поиск"
                                    type="text" className="form-control my-3 text-dark-emphasis"
                                    style={{width: "45%"}}/>
                            </div>
                            <table className="table table-dark">
                                <thead>
                                <tr>
                                    <th scope="col">Фамилия сотрудника</th>
                                    <th scope="col">Имя сотрудника</th>
                                    <th scope="col">Логин</th>
                                    <th scope="col">Тг-логин</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody id="employeeTbody">
                                {
                                    searchedEmployees && searchedEmployees.map(user => {
                                        if (user.is_employee || user.is_staff) {
                                            return (
                                                <tr key={user.id}>
                                                    <td>{user.last_name}</td>
                                                    <td>{user.first_name}</td>
                                                    <td>{user.username}</td>
                                                    <td>{user.tg_login}</td>
                                                    <td><a href={`${user.id}/`} className="btn btn-info">Посмотреть</a></td>
                                                </tr>
                                            )
                                        }
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex flex-column" id="usersTable" style={{width: "470px"}}>
                            <h5 className="display-5 fw-semibold text-center mt-2 mb-3">Пользователи</h5>
                            <div className="d-flex justify-content-start align-items-center" style={{width: "100%"}}>
                                <Input
                                    onChange={(e) => setSearchUsersQuery(e.target.value)}
                                    value={searchUsersQuery}
                                    placeholder="Поиск"
                                    type="text" className="form-control my-3 text-dark-emphasis"
                                    style={{width: "45%"}}/>
                            </div>
                            <table className="table table-dark">
                                <thead>
                                <tr>
                                    <th scope="col">Логин</th>
                                    <th scope="col">Эл. почта</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody id="userTbody">
                                {
                                    searchedUsers && searchedUsers.map(user => {
                                        if (!user.is_employee && !user.is_staff) {
                                            return (
                                                <tr key={user.id}>
                                                    <td>{user.username}</td>
                                                    <td>{user.email}</td>
                                                    <td><a href={`${user.id}/`} className="btn btn-info">Посмотреть</a></td>
                                                </tr>
                                            )
                                        }
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )

};
export default AdminEmployees;