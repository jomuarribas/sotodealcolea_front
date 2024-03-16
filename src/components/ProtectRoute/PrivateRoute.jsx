import { Navigate } from 'react-router-dom'
import { useIsLogin } from '../../hooks/useIsLogin'
import Loader from '../Loader/Loader'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const PrivateRoute = ({ children }) => {
  const { isLoginChecked, loading } = useIsLogin()

  if (loading) {
    return <Loader />
  }

  if (isLoginChecked) {
    return (
      <>
        <Header />
        <main id='main'>{children}</main>
        <Footer />
      </>
    )
  } else {
    return <Navigate to='/login' />
  }
}

export default PrivateRoute
