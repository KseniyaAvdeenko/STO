import React, {useMemo, useState} from "react";
import Input from "../UI/Input";

const SectionPrices = ({types}) => {
    const [searchTypesQuery, setSearchTypesQuery] = useState("")
    const searchedTypes = useMemo(() => {
        return types && types.filter(type => type.type.toLowerCase().includes(searchTypesQuery))
    }, [searchTypesQuery, types])
    return (
        <section className="prices">
            <div className="container">
                <h1 className="title title_font intro-title prices__title mb-5">
                    Цены на услуги
                </h1>
                <div className="d-flex justify-content-start align-items-center mt_5" style={{width: "100%"}}>
                    <Input
                        onChange={(e) => setSearchTypesQuery(e.target.value)}
                        value={searchTypesQuery}
                        placeholder="Поиск"
                        type="text" className="form-control text-dark-emphasis"
                        style={{width: "25%"}}/>
                </div>
                <table className="table table-dark table-hover mt-3 mb-5">
                    <thead>
                    <tr>
                        <th scope="col">Наименование услуги</th>
                        <th scope="col">Цена, BYN</th>
                    </tr>
                    </thead>
                    <tbody id="tbody">
                    {
                        searchedTypes && searchedTypes.map(type =>
                            <tr key={type.s_id}>
                                <td className="table-dark">{type.type}</td>
                                <td className="table-dark">{type.price}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
};
export default SectionPrices;