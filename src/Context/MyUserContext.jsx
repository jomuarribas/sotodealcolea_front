import { createContext, useState, useContext } from 'react'

const MyUserContext = createContext()

export const MyUserProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [residential, setResidential] = useState()

  return (
    <MyUserContext.Provider
      value={{
        user,
        setUser,
        residential,
        setResidential,
      }}
    >
      {children}
    </MyUserContext.Provider>
  )
}

export const useMyUserState = () => useContext(MyUserContext)
