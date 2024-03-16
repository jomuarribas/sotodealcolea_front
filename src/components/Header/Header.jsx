import './Header.css'
import { useState } from 'react'
import Nav from '../Nav/Nav'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuNavigation = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('id_residential')
  }

  return (
    <>
      <header>
        <div className='menuAndHome'>
          <div className='navMenu' onClick={menuNavigation}>
            <span
              className={`material-symbols-outlined ${isMenuOpen ? 'menuTurnOn' : 'menuTurnOff'}`}
            >
              menu
            </span>
            <p>menu</p>
          </div>
          <NavLink to='/' className='userAndSession' onClick={closeMenu}>
            <span className='material-symbols-outlined'>home</span>
            <p>home</p>
          </NavLink>
        </div>
        <div className='headerLogo'>
          <img src='assets/logo2.webp' alt='Logo' />
          <h1>CDV SOTO DE ALCOLEA</h1>
        </div>
        <div className='userAndSessionDiv'>
          <NavLink
            to='/myresidential'
            className='userAndSession'
            onClick={closeMenu}
          >
            <span className='material-symbols-outlined'>home_pin</span>
            <p>mi parcela</p>
          </NavLink>
          <NavLink to='/user' className='userAndSession' onClick={closeMenu}>
            <span className='material-symbols-outlined'>person</span>
            <p>usuario</p>
          </NavLink>

          <NavLink to='/login' className='userAndSession' onClick={logout}>
            <span className='material-symbols-outlined'>logout</span>
            <p>cerrar sesion</p>
          </NavLink>
        </div>
      </header>
      <Nav isOpen={isMenuOpen} onCloseMenu={closeMenu} />
    </>
  )
}

Nav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseMenu: PropTypes.func.isRequired,
}

export default Header
