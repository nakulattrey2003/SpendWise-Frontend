import React from 'react'
import { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const contextValue = {
        user, setUser
    }
  return (
    <AppContext.Provider value={{contextValue}}>
      {children}
    </AppContext.Provider>
  )
}