import {useForm} from "react-hook-form";
import {useAuth} from "../hooks/useAuth";
import {login} from "./AutoServiceFetch";

const Login = () => {
    const {logIn} = useAuth();
    const {register, handleSubmit} = useForm()

    const onSubmit = (data) => {
        console.log(data)
        login(data).then(function (response,) {
            console.log(response.status, response.statusText)
            return response.json()
        }).then(function (res) {
            if (res.auth_token) {
                localStorage.setItem('token', res.auth_token)
                logIn(res.auth_token)
                console.log(localStorage.token)
                window.location.replace('http://127.0.0.1:3000/admin-site/')
            }
        }).catch(function (e) {
            console.log(e)
            alert('Неправильные учетные данные')
        })
    };

    return (
        <div className="container d-flex" style={{margin: "10% auto"}}>
            <main className="container">
                <div className="d-flex justify-content-center align-items-center" style={{width: '100%'}}>
                    <form className="form-box_small rounded-3" id="regForm" onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="subtitle subtitle_font" style={{textAlign: 'center'}}>Авторизация</h3>
                        <div className="form-floating mb-3">
                            <input {...register("email", {required: true})} type="email" className="form-control"
                                   placeholder='Эл. почта' id="regEmailInput"/>
                            <label htmlFor="regEmailInput" id="regEmailLabel">Эл. почта</label>
                        </div>
                        <div className="form-floating">
                            <input {...register("password", {required: true})} type="password" className="form-control"
                                   placeholder='Пароль' id="regPasswordInput"/>
                            <label htmlFor="regPasswordInput" id="regPasswordLabel">Пароль</label>
                        </div>
                        <button type="submit" className="btn btn-secondary mt-3">Войти</button>
                    </form>
                </div>
            </main>
        </div>
    )
};
export default Login;