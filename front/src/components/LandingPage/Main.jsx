import HeaderMain from "./HeaderMain";
import Footer from "../Footer";
import SectionIntro from "./SectionIntro";
import SectionAdvantages from "./SectionAdvantages";
import SectionService from "./SectionService";
import SectionAbout from "./SectionAbout";
import SectionServiceOrder from "./SectionServiceOrder";


export function Main({types}) {
    let links = document.querySelectorAll(".smooth");

    for (let i = 0; i < links.length; i++) {
        links[i].onclick = function () {
            document.getElementById(links[i].getAttribute("data-link")).scrollIntoView({behavior: "smooth"});
        }
    }

    return (
        <div>
            <HeaderMain/>
            <SectionIntro/>
            <SectionAdvantages/>
            <SectionService types={types}/>
            <SectionAbout/>
            <SectionServiceOrder/>
            <Footer/>
        </div>

    )
};