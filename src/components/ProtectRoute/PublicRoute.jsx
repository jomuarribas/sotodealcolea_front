import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
  const isLocalId = !!localStorage.getItem('id')
  const isLocalToken = !!localStorage.getItem('token')

  if (!isLocalId && !isLocalToken) {
    return <main id='main'>{children}</main>
  } else {
    return <Navigate to='/' />
  }
}

export default PublicRoute
