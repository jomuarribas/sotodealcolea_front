import { NavLink } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'
import './Footer.css'

const Footer = () => {
  const { isLoading } = useApi()

  return (
    <footer id='footer'>
      <p>© CDV Soto de Alcolea</p>
      <div className='policyAndTermsFooter'>
        <NavLink to='/privacypolicy'>Política de privacidad</NavLink>
        <span>||</span>
        <NavLink to='/termsOfUse'>Términos de uso</NavLink>
      </div>
      <div className='socialIcons'>
        <div className='facebookSvg'></div>
        <div className='instagramSvg'></div>
      </div>
    </footer>
  )
}

export default Footer
