import CloseIcon from "../../../assets/img/close.png";
import {useForm} from "react-hook-form";
import {createService} from "../../AutoServiceFetch";
import {useState} from "react";

const AddServiceType = ({modal}) => {
    const [newModal, setNewModal] = useState(modal)
    const {register, handleSubmit} = useForm()

    const onSubmit = (data) => {
        data.price = parseFloat(data.price)
        console.log(data)
        createService( data).then(function (response) {
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
            <form className="form-box_small rounded-3" id="addServiceForm" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="subtitle subtitle_font" style={{textAlign: 'center'}}>Добавление вида обслуживания</h2>
                <div className="form-floating mb-3">
                    <input
                        {...register("type", {required:true})}
                        type="text"
                        className="form-control"
                        id="type"
                        placeholder='Вид обслуживания'/>
                    <label htmlFor="type">Вид обслуживания</label>
                </div>
                <div className="form-floating">
                    <input
                        {...register("price")}
                        type="text"
                        className="form-control"
                        id="price"
                        placeholder='Цена'/>
                    <label htmlFor="price">Цена</label>
                </div>
                <button type="submit" className="btn btn-secondary mt-3">Создать</button>
            </form>
    )
};
export default AddServiceType;