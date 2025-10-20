import type { Photo } from "../../../component/interface/interface"
import { myaxios } from "../../axios/axios"


const getPhotoId = async(id:string):Promise<Photo| undefined>  => {

    try {
        
        const rezult = await myaxios.get(`/photos/${id}`)
        return rezult.data
    } catch (error) {
        console.error(error)
        return undefined 
        
    }
}

export default getPhotoId