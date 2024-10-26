import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    axios.defaults.baseURL = 'http://localhost:4040';
  axios.defaults.withCredentials = true;
  const [email, setEmail] = useState(null);
  const [id, setId] = useState(null);
  useEffect(() => {
    axios.get('/users/profile').then(response => {
      setId(response.data.userId);
      setEmail(response.data.email);
    });
  }, []);
  return (
    <UserContext.Provider value={{email, setEmail, id, setId}}>
      {children}
    </UserContext.Provider>
  );
}