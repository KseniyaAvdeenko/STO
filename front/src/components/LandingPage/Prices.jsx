import HeaderPrices from "./HeaderPrices";
import Footer from "../Footer";
import SectionPrices from "./SectionPrices";

const Prices = ({types}) => {
    return (
        <div>
            <HeaderPrices/>
            <SectionPrices types={types}/>
            <Footer/>
        </div>
    );
};
export default Prices;