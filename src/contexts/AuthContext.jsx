import { createContext,useState,useEffect,useContext  } from "react";
const AuthContext=createContext();
export const useAuth=  ()=>useContext(AuthContext);

export const AuthProvider= ({children})=>{
    const [token,setToken]=useState(null);
    const [user,setUser]=useState(null);

    useEffect(()=>{
        const storedToken=localStorage.getItem("token");
        const storedUser=localStorage.getItem("user");
        if(storedToken) setToken(storedToken);
        if(storedUser) setUser(storedUser);
    },[])

    const loginUser= (authResponse)=>{
        const {token,name,email,userId}=authResponse;
        const userData={userId,name,email};
        localStorage.setItem("token",token);
        localStorage.setItem(user,JSON.stringify(userData));
        setToken(token);
        setUser(userData);
    }

    const logoutUser=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    }

    const isLoggedIn=()=>!!token;

    const value={
        token,
        user,
        loginUser,
        logoutUser,
        isLoggedIn
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}