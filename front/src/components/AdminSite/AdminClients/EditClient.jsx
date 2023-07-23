import {useForm} from "react-hook-form";
import {editClient} from "../../AutoServiceFetch";
import {useState} from "react";

const EditClient = ({clientId, client, modal}) => {
    const [newModal, setNewModal] = useState(modal)
    const {register, handleSubmit} = useForm()

    const onSubmit = (data) => {

        data.orders = []
        client.orders.map(cl => {
            data.orders.push(cl._id)
        })
        console.log(data)
        editClient(clientId, data).then(function (response) {
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
        <form className="form-box_small rounded-3" id="addClientForm" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="subtitle subtitle_font" style={{textAlign: 'center'}}>Изменение данных клиента</h2>
            <div className="form-floating mb-3">
                <input
                    {...register("name")}
                    type="text"
                    defaultValue={client.name}
                    className="form-control"
                    placeholder="Имя и фамилия клиента"
                    id="addName"/>
                <label htmlFor="name" className="font-color_dark">Имя и фамилия клиента</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    {...register("phone")}
                    type="text"
                    defaultValue={client.phone}
                    className="form-control"
                    id="addPhone" placeholder='Телефон клиента'/>
                <label htmlFor="phone" className="font-color_dark">Телефон клиента</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text"
                       {...register("city")}
                       className="form-control" id="addCity"
                       defaultValue={client.city}
                       placeholder='Город клиента'/>
                <label htmlFor="city" className="font-color_dark">Город клиента</label>
            </div>
            <div className="form-floating">
                <input
                    {...register("car")}
                    type="text"
                    className="form-control"
                    id="addCar"
                    defaultValue={client.car}
                    placeholder='Марка и модель авто клиента'/>
                <label htmlFor="car" className="font-color_dark">Марка и модель авто клиента</label>
            </div>
            <button type="submit" className="btn btn-secondary mt-3">Изменить</button>
        </form>
    )
};
export default EditClient;

