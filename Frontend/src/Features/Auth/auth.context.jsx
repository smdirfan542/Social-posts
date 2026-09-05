import { createContext ,useState} from "react";
import { Login } from "./services/auth.api";
import { Register } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(false)

    const HandleRegister = async (username,email,password)=>{
        setLoading(true);
        try{
            const response = await Register(username,email,password)
            setUser(response.user)
        }catch(err){
            throw err;
        }finally{
            setLoading(false)
        }
    }

    const HandleLogin = async(username,password)=>{
        setLoading(true);
        try{
            const response =await Login(username,password);
            setUser(response.user)
        }catch(err){
            throw err;
        }finally{
            setLoading(false)
        }
    }
    return (
        <AuthContext.Provider value={{user,loading,HandleLogin,HandleRegister}}>
            {children}
        </AuthContext.Provider>
    )
}