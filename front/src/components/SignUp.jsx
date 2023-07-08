import {useForm} from "react-hook-form";
import {signUp} from "./AutoServiceFetch";


const SignUp = () => {
    const {register, handleSubmit} = useForm()
    const onSubmit = (data) => {
        console.log(data)
        signUp.then(function (response) {
            console.log(response.status, response.statusText)
            if (response.status === 201){
                alert('Пользователь зарегистрирован')
                window.location.replace('http://127.0.0.1:3000/login/')
            }
            return response.json()
        }).catch(e => {
            alert('Произошла ошибка регистрации')
            console.log(e)
        })
    };
    return (
        <div className="container d-flex" style={{margin: "10% auto"}}>
            <main className="container">
                <div className="d-flex justify-content-center align-items-center" style={{width: '100%'}}>
                    <form className="form-box_small rounded-3" id="regForm" onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="subtitle subtitle_font" style={{textAlign: 'center'}}>Регистрация</h3>
                        <div className="form-floating mb-3">
                            <input {...register("username", {required: true})} type="text" className="form-control"
                                   placeholder='Логин' id="regLoginInput"/>
                            <label htmlFor="regLoginInput" id="regLoginLabel">Логин</label>
                        </div>
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
                        <button type="submit" className="btn btn-secondary mt-3">Отправить</button>
                    </form>
                </div>
            </main>
        </div>
    )
};
export default SignUp;