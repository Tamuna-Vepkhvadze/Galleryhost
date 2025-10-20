import { Outlet } from "react-router-dom"
import Heder from "../component/Header/Heder"


const Leyout = () => {
  return (
    <>
    <Heder/>
    <Outlet/>
    </>
  
  )
}

export default Leyout