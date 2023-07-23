import CloseIcon from "../../../assets/img/close.png";
import {useForm} from "react-hook-form";
import {createClientWithCar} from "../../AutoServiceFetch";
import {useState} from "react";


const AddClient = ({modal}) => {
    const[newModal, setNewModal] = useState(modal)
    const {register, handleSubmit} = useForm()

    const onSubmit = (data) => {
        data._id = Date.now()
        data.orders = []
        console.log(data)
        createClientWithCar(data).then(function (response) {
            console.log(response.status, response.statusText)
            if (response.status === 201) {
                window.location.reload()
            }
            return response.json()
        }).catch(function (e) {
            console.log(e)
            setNewModal(false)
        })
    };
    return (
            <form className="form-box_small rounded-3" onSubmit={handleSubmit(onSubmit)} style={{width: "75%"}}>
                <h2 className="subtitle subtitle_font" style={{textAlign:'center'}}>Добавление клиента</h2>
                <div className="form-floating mb-3">
                    <input
                        {...register("name")}
                        type="text"
                        className="form-control"
                        placeholder="Имя и фамилия клиента"
                        id="addName"/>
                    <label htmlFor="name" className="font-color_dark">Имя и фамилия клиента</label>
                </div>
                <div className="form-floating mb-3">
                    <input {...register("phone")}
                           type="text"
                           className="form-control"
                           id="addPhone" placeholder='Телефон клиента'/>
                    <label htmlFor="phone" className="font-color_dark">Телефон клиента</label>
                </div>
                <div className="form-floating mb-3">
                    <input {...register("city")}
                        type="text"
                        className="form-control" id="addCity"
                        placeholder='Город клиента'/>
                    <label htmlFor="city" className="font-color_dark">Город клиента</label>
                </div>
                <div className="form-floating">
                    <input {...register("car")}
                        type="text"
                        className="form-control"
                        id="addCar"
                        placeholder='Марка и модель авто клиента'/>
                    <label htmlFor="car" className="font-color_dark">Марка и модель авто клиента</label>
                </div>
                <button type="submit" className="btn btn-secondary mt-3">Создать</button>
            </form>
    )
};
export default AddClient;