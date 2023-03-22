import {createContext,useState,useEffect} from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [currentUser, SetCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = () =>{
        // To do
        SetCurrentUser({
            id:1,
            name: "Amit Kumar",
            profilePic: "https://images.pexels.com/photos/5207616/pexels-photo-5207616.jpeg"
        });
    }

    useEffect(()=>{
localStorage.setItem("user", JSON.stringify(currentUser))
    },[currentUser])

  return(
    <AuthContext.Provider value={{ currentUser, login }}>
    {children}
    </AuthContext.Provider>
  )   
};