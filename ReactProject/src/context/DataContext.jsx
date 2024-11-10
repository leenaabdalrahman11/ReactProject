import { createContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";

export const UserContext = createContext();
const UserContextProvider = ({children})=>{
    const [isLogin, setisLogin] = useState(localStorage.getItem("userToken") ? true : false);
    const [userData, setuserData] = useState({});
    useEffect(() => {
      const token = localStorage.getItem("userToken");
      if (token) {
        const decoded = jwtDecode(token);
        setuserData(decoded);
        setisLogin(true);
      }
    }, []); 
    const contextValue = {
        isLogin,
        userData,
        setisLogin,
        setuserData
      };
    return <UserContext.Provider value={contextValue}>
        {children}
    </UserContext.Provider>;
}
export default UserContextProvider;