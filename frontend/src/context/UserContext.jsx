import { Children, createContext,useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
      

    return(
        <UserContext.Provider value={{user,setUser,isLogin,setIsLogin}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;