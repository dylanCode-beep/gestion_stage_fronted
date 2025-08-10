import { createContext, useContext,useEffect,useState } from "react";
import { BASE_URL,SANCTUM_URL } from "../helpers/config.js";


const AuthContext = createContext();

export function AuthProvider({children}){
 const [user,setUser] = useState(null);

 const loadUser = async () => {
    try {
      await axios.get(SANCTUM_URL, { withCredentials: true });
      const response = await axios.get(`${BASE_URL}/me`, { withCredentials: true });
      setUser(response.data);
    } catch (error) {
      console.log("Utilisateur non authentifié");
      setUser(null);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      loadUser(); // tente de récupérer depuis backend
    }
  }, []);

 const register = (userData) =>{
  setUser(userData);
  localStorage.setItem("user",JSON.stringify(userData))
 };

 const login = (userData) =>{
  setUser(userData);
  localStorage.setItem("user",JSON.stringify(userData));
 };

   const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
  };

 return (
  <AuthContext.Provider value={{user,login,register,logout}}>
   {children}
  </AuthContext.Provider>
 )
}

export const useAuth = () => useContext(AuthContext)