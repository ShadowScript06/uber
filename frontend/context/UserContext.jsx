import React, {  useState } from 'react'
import { UserDataContext } from './UserDataContext';



export default function UserContext({children}) {
    const [user,setUser]=useState(null);

  return (
    <UserDataContext.Provider value={{user,setUser}}>
        {children}
    </UserDataContext.Provider>
   
  )
}

