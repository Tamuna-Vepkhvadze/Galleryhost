import { useEffect, useState } from "react"

const useNonserch = <T>(value:T, diley:300) => {
    const [time, settime] = useState(value)
    useEffect(() => {
        const clear = setTimeout(() =>settime(value), diley);

        return () => clearTimeout(clear)
    },[value, diley])
    return time
}


export default useNonserch