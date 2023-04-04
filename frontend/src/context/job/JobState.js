import JobContext from "./jobContext";

const JobState = (props)=>{

    const state = {
        "name": "",
        "class": ""
    }
    return(
        <JobContext.Provider value ={state}>
            {props.children}
        </JobContext.Provider>
    )

}

export default JobState;