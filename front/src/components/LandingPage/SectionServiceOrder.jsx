import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {getNtfMethods, getProblems, sendAppToTg} from "../AutoServiceFetch";


const SectionServiceOrder = () => {
    const [problems, setProblems] = useState([])
    const [methods, setMethods] = useState([])
    useEffect(() => {
        getProblems().then(data => setProblems(data));
    }, [])
    useEffect(()=>{
        getNtfMethods().then(data => setMethods(data))
    }, [])
    const {register, handleSubmit} = useForm()
    const onSubmit = async (data) => {
        console.log(JSON.stringify(data))
        sendAppToTg(data).then(function (response) {
            console.log(response.status, response.statusText)
            return response.json()
        }).catch(e => console.log(e))
    }
    return (
        <section className="order order_bg" id="order">
            <div className="container">
                <form className="order__container" id="orderForm" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="subtitle subtitle_font font-color_dark">Пожалуйста, заполните заявку и мы сообщим
                        вам сроки и
                        полную стоимость, а также ответим на все вопросы. Просто укажите, по какому номеру с вами
                        связаться.
                    </h3>
                    <div className="problems__container" id="problemsContainer">
                        <h5 className="font-color_dark">Где возникла проблема?</h5>
                        <p className="font-color_dark">Выберите один или несколько вариантов. Если поломку трудно определить, то выберите
                            диагностику.
                        </p>
                        <div className="problems__items" id="problems">
                            {
                                problems && problems.map(p => <div key={p.id} className="problems__item">
                                        <input {...register("types")}
                                               type="checkbox"
                                               className="problem-checkbox"
                                               id={p.problem}
                                               value={p.problem}
                                        />
                                        <label className="problem_label" htmlFor={p.problem}>{p.problem}</label>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="user-data__container " id="getClientData">
                        <div className="methods__items">
                            {
                                methods && methods.map(m =>
                                    <div className="methods__item" key={m.id}>
                                        <label
                                            htmlFor={m.method}
                                            className="mb-2">
                                            <img src={`http://localhost:8000${m.icon}`} alt={m.method} height="30" width="30"/></label>
                                        <input
                                            {...register("ntf_method")}
                                            value={m.method}
                                            type="radio"
                                            id={m.method}
                                            className="method__input"/>
                                    </div>
                                )
                            }
                        </div>
                        <div className="user-data__items">
                            <div className="form-floating mb-3">
                                <input {...register("car")}
                                       type="text"
                                       className="form-control text-bg-dark p-3 pt-4"
                                       id="userCar"
                                       placeholder="Марка и модель вашего авто"
                                       style={{height: "70px"}}
                                />
                                <label htmlFor="userCar">Марка и модель вашего авто</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input {...register("name")}
                                       type="text"
                                       className="form-control text-bg-dark p-3 pt-4"
                                       id="userName"
                                       placeholder="Ваше имя"
                                       style={{height: "70px"}}
                                />
                                <label htmlFor="userName" className="form-label">Ваше имя</label>
                            </div>
                            <div className="form-floating">
                                <input {...register("phone", {pattern: /375(?:33\d{7}|29\d{7}|44\d{7}|25\d{7})/})}
                                       pattern="375(?:33\d{7}|29\d{7}|44\d{7}|25\d{7})"
                                       type="text"
                                       className="form-control text-bg-dark p-3 pt-4"
                                       id="userPhone"
                                       style={{height: "70px"}}
                                       placeholder="Ваш номер телефона"/>
                                <label htmlFor="userPhone" className="form-label">Ваш номер телефона</label>
                            </div>
                        </div>

                        <div className="next-btn__items">
                            <input type="submit" className="button" value="Отправить"/>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
};
export default SectionServiceOrder;