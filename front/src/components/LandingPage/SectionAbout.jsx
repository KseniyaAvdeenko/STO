import {useEffect, useState} from "react";
import {getTextAbout} from "../AutoServiceFetch";

const SectionAbout = () => {
    const [text, setText] = useState([])
    useEffect(()=>{
            getTextAbout().then(data => setText(data));
    }, [])

    return (
        <section className="about about_bg" id="about">
            <div className="container">
                <h1 className="title title_font about__title">О компании</h1>
                <div className="p__items">
                    {
                        text && text.map(t => <p key={t.id} className="p__item">{t.text}</p>)
                    }
                </div>
            </div>
        </section>
    )
};
export default SectionAbout;