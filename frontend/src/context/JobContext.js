import { createContext, useState, useEffect } from "react";

const JobContext = createContext({

})

export const JobProvider = ({ children }) => {

    const title  = {
        0: 'Customer Info',
        1: 'Order',
        2: 'Service',
        3: 'Carving',
        5: 'Product'
    }

    const [page,setPage] = useState(0)

    const [data, datadata] = useState(
        {
            first_name: "",
            middle_name: "",
            last_name: "",
            phone: "",
            email: "",
            address: "",
            notes: ""
        }
    );

    return(
        <JobContext.Provider value={{title, page, setPage, data, datadata }}>
{children}
        </JobContext.Provider>
    )
}

export default JobContext