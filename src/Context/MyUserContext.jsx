import { createContext, useState, useContext } from 'react'

const MyUserContext = createContext()

export const MyUserProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [residential, setResidential] = useState()
  const [id, setId] = useState()
  const [idResidential, setIdResidential] = useState()

  return (
    <MyUserContext.Provider
      value={{
        user,
        setUser,
        residential,
        setResidential,
        id,
        setId,
        idResidential,
        setIdResidential,
      }}
    >
      {children}
    </MyUserContext.Provider>
  )
}

export const useMyUserState = () => useContext(MyUserContext)
