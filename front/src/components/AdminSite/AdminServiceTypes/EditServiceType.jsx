import {useForm} from "react-hook-form";
import CloseIcon from "../../../assets/img/close.png";
import {editService} from "../../AutoServiceFetch";
import {useState} from "react";

const EditServiceType = ({type, typeId, modal}) => {
    const [newModal, setNewModal] = useState(modal)

    const {register, handleSubmit} = useForm()

    const onSubmit = (data) => {
        data.price = parseFloat(data.price)
        console.log(data)
        editService(typeId, data).then(function (response) {
            console.log(response.status, response.statusText)
            if (response.status === 200) {
                window.location.reload()
            }
            return response.json()
        }).catch(function (e) {
            console.log(e)
            setNewModal(false)
        })
    };
    return (
            <form className="form-box_small rounded-3" id="editServiceForm" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="subtitle subtitle_font" style={{textAlign:'center'}}>Изменение вида обслуживания</h2>
                <div className="form-floating mb-3">
                    <input
                        {...register("type", {required: true, value: type.type})}
                        type="text"
                        className="form-control"
                        id="type"
                        placeholder='Вид обслуживания'/>
                    <label htmlFor="type">Вид обслуживания</label>
                </div>
                <div className="form-floating">
                    <input
                        {...register("price", {required:true, value: type.price})}
                        type="text"
                        className="form-control" id="price"
                        placeholder='Цена'/>
                    <label htmlFor="price">Цена</label>
                </div>
                <button type="submit" className="btn btn-secondary mt-3">Сохранить</button>
            </form>
    )
};
export default EditServiceType;