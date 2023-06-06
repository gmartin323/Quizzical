import {useEffect, useState} from "react"

function UseFetch(url, restart) {
    const [data, setData] = useState({})
    
    useEffect(() => {
        if(url) {  
            fetch(url)
                .then(response => response.json())
                .then(data => setData(data))
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [restart])
    
    return {data}   
}

export {UseFetch}