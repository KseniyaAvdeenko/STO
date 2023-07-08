import {useEffect, useState} from "react";
import {getAdvantages} from "../AutoServiceFetch";

const SectionAdvantages = () => {
    const [advs, setAdvs] = useState([]);
    useEffect(()=> {
        getAdvantages().then(data => setAdvs(data));
    }, [])

    return (
        <section className="advantages advantages_bg">
            <div className="container">
                <div className="ads__container">
                    <h3 className="subtitle subtitle_font font-color_dark">Вместе с Вами, стоя у подъемника,
                        расскажем, что
                        требует
                        <span className="span_color">срочного ремонта</span> , а что может <span
                            className="span span_color">еще
                        подождать</span>
                    </h3>
                    <div className="ads__items">
                        {
                            advs && advs.map(adv =>
                                <div className="ads__item" key={adv.id}>
                                    <img src={`http://localhost:8000${adv.img}`} alt="stages" className="item__img"/>
                                    <p className="item__text font-color_dark">{adv.adv}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
};
export default SectionAdvantages;