import {useEffect, useState} from "react";

const SectionService = (props) => {
    return (
        <section className="service service_bg" id="service" style={{height: 'fit-content'}}>
            <div className="container">
                <h1 className="title title_font service__title">Услуги</h1>
                <div className="types__items" id="typesItems" >
                    {
                        props.types && props.types.map(type => <div className="types__item" key={type.s_id}>{type.type}</div>)
                    }
                </div>
            </div>
        </section>
    )
};
export default SectionService;