
import Navbar from "../components/navbar/Navbar";
import RouterOutlet from "../routes/RouterOutlet";


// The base view that act as the template for all routes.


export default function BaseView() {
    return <>
        <Navbar />
        <RouterOutlet />
    </>
}