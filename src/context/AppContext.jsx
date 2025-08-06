// import React from 'react'
// import { createContext, useState } from 'react'

// export const AppContext = createContext()

// export const AppContextProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const contextValue = {
//         user, setUser
//     }
//   return (
//     <AppContext.Provider value={{contextValue}}>
//       {children}
//     </AppContext.Provider>
//   )
// }
// AppContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
