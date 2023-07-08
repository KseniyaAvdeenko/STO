import React, {useEffect, useState} from 'react'
import './App.css';
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import {Main} from "./components/LandingPage/Main";
import Prices from "./components/LandingPage/Prices";
import {AdminSite} from "./components/AdminSite/AdminSite";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import {AuthProvider} from "./hooks/AuthProvider";
import {RequireAuth} from "./hooks/RequireAuth";
import AdminEmployees from "./components/AdminSite/AdminEmployees/AdminEmployees";
import HeaderAdmin from "./components/AdminSite/HeaderAdmin";
import SideBar from "./components/AdminSite/SideBar";
import AdminEmployeeById from "./components/AdminSite/AdminEmployees/AdminEmployeeById";
import {getServiceTypes, getUserProfile, logoutFetch} from "./components/AutoServiceFetch";
import AdminClients from "./components/AdminSite/AdminClients/AdminClients";
import AdminClientsById from "./components/AdminSite/AdminClients/AdminClientsById";
import {AdminServiceTypes} from "./components/AdminSite/AdminServiceTypes/AdminServiceTypes";
import AdminServiceTypeById from "./components/AdminSite/AdminServiceTypes/AdminServiceTypeById";
import {AdminOrders} from "./components/AdminSite/AdminOrders/AdminOrders";
import AdminOrderById from "./components/AdminSite/AdminOrders/AdminOrderById";




function App() {
    let {userId} = useParams();
    const [token, setToken] = useState(localStorage.token)
    const [user, setUser] = useState('')
    const [types, setTypes] = useState([])
    useEffect(() => {
        getServiceTypes().then(data => setTypes(data));
    }, [])

    useEffect(() => {
        if (token) {
            getUserProfile(token).then(data => setUser(data));
        }
    }, [token])

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main types={types}/>}/>
                    <Route path="prices/" element={<Prices types={types}/>}/>
                    <Route path="login/" element={<Login/>}/>
                    <Route path="signup/" element={<SignUp/>}/>
                    <Route path="admin-site/" element={
                        <RequireAuth>
                            <div>
                                <HeaderAdmin/>
                                <div className="d-flex" id="wrapper">
                                    <SideBar user={user}/>
                                    <AdminSite user={user} token={token}/>
                                </div>
                            </div>
                        </RequireAuth>
                    }/>
                    <Route path="admin-site/employees/" element={
                        <RequireAuth>
                            <div>
                                <HeaderAdmin/>
                                <div className="d-flex" id="wrapper">
                                    <SideBar user={user}/>
                                    <AdminEmployees token={token}/>
                                </div>
                            </div>
                        </RequireAuth>
                    }/>
                    <Route path="admin-site/employees/:userId" element={
                        <RequireAuth>
                            <div>
                                <div className="d-flex" id="wrapper">
                                    <AdminEmployeeById token={token}/>
                                </div>
                            </div>
                        </RequireAuth>
                    }/>
                     <Route path="admin-site/clients/" element={
                        <RequireAuth>
                            <div>
                                <HeaderAdmin/>
                                <div className="d-flex" id="wrapper">
                                    <SideBar user={user}/>
                                    <AdminClients/>
                                </div>
                            </div>
                        </RequireAuth>
                    }/>
                    <Route path="admin-site/clients/:clientId" element={
                        <RequireAuth>
                            <div>
                                <div className="d-flex" id="wrapper">
                                    <AdminClientsById/>
                                </div>
                            </div>
                        </RequireAuth>
                    }/>
                    <Route path="admin-site/service/" element={
                        <RequireAuth>
                            <div>
                                <HeaderAdmin/>
                                <div className="d-flex" id="wrapper">
                                    <SideBar user={user}/>
                                    <AdminServiceTypes types={types}/>
                                </div>
                            </div>
                        </RequireAuth>
                    }/>
                    <Route path="admin-site/service/:typeId" element={
                        <RequireAuth>
                            <div>
                                <div className="d-flex" id="wrapper">
                                    <AdminServiceTypeById/>
                                </div>
                            </div>
                        </RequireAuth>
                    }/>
                    <Route path="admin-site/orders/" element={
                        <RequireAuth>
                            <div>
                                <HeaderAdmin/>
                                <div className="d-flex" id="wrapper">
                                    <SideBar user={user}/>
                                    <AdminOrders types={types}/>
                                </div>
                            </div>
                        </RequireAuth>
                    }/>
                    <Route path="admin-site/orders/:orderId" element={
                        <RequireAuth>
                            <div>
                                <div className="d-flex" id="wrapper">
                                    <AdminOrderById types={types}/>
                                </div>
                            </div>
                        </RequireAuth>
                    }/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
