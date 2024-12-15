import React, { createContext, useState } from 'react'

export const UsersDataContext = createContext();

const UsersContext = ({children}) => {
  const [user, setUser] = useState({
    email: "",
    fullname: {
        firstname: "",
        lastname: ""
    }
  });
  return (
    <div>
      <UsersDataContext.Provider value={{user, setUser}}>
        {children}
      </UsersDataContext.Provider>
    </div>
  )
}

export default UsersContext
