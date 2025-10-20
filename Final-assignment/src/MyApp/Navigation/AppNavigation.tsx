import { Route, Routes } from "react-router-dom"
import HomePage from "../Page/HomePage/HomePage"
import ContactPage from "../Page/ContactPage/ContactPage"
import Leyout from "../Page/Leyout"
import Login from "../Page/UserPage/UserLogin/Login"
import FavoritesPage from "../Page/UserPage/uzerProfile/FavoritesPage"
import UzerRegistration from "../Page/UserPage/UserRegistration/uzerRegistration"
import ErrorPage404 from "../Page/Error/Error"
import About from "../Page/AboutPage/About/About"
import ElectricLoading from "../component/Loader/ElectricLoading"


const AppNavigation = () => {
return(
    <Routes>
        <Route path="/" element = {<Leyout/>}>
            <Route index element= {<HomePage/>}/>
            <Route path="About" element={<About />} />
            <Route path="ContactPage" element= {<ContactPage/>}/>
            <Route path="ElectricLoading" element= {<ElectricLoading/>}/>
            <Route path="uzerRegistration" element={<UzerRegistration/>}/>
            <Route path="Login" element={<Login/>}/>
            <Route path="FavoritesPage" element={<FavoritesPage/>}/>
        </Route>
    <Route path="*" element={<ErrorPage404 />} />
    </Routes>
)}
export default AppNavigation