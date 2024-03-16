import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Nav.css'

const Nav = ({ isOpen, onCloseMenu }) => {
  const handleNavLinkClick = () => {
    onCloseMenu()
  }

  return (
    <nav className={`nav ${isOpen ? 'openMenu' : 'closeMenu'}`}>
      <div className={`navList ${isOpen ? 'openMenuList' : 'closeMenuList'}`}>
        <NavLink
          to='/myresidential'
          className='userAndSession'
          onClick={handleNavLinkClick}
        >
          <span className='material-symbols-outlined'>home_pin</span>
          <p>Mi parcela</p>
          <span className='material-symbols-outlined nextIcon'>
            navigate_next
          </span>
        </NavLink>
        <NavLink
          to='/incidents'
          className='userAndSession'
          onClick={handleNavLinkClick}
        >
          <span className='material-symbols-outlined'>priority_high</span>
          <p>Incidencias</p>
          <span className='material-symbols-outlined nextIcon'>
            navigate_next
          </span>
        </NavLink>
        <NavLink
          to='/formalities'
          className='userAndSession'
          onClick={handleNavLinkClick}
        >
          <span className='material-symbols-outlined '>description</span>
          <p>Tramites</p>
          <span className='material-symbols-outlined nextIcon'>
            navigate_next
          </span>
        </NavLink>
        <NavLink
          to='/help'
          className='userAndSession'
          onClick={handleNavLinkClick}
        >
          <span className='material-symbols-outlined'>help</span>
          <p>Ayuda</p>
          <span className='material-symbols-outlined nextIcon'>
            navigate_next
          </span>
        </NavLink>
      </div>
    </nav>
  )
}

Nav.propTypes = {
  isOpen: PropTypes.isRequired,
  onCloseMenu: PropTypes.isRequired,
}

export default Nav
