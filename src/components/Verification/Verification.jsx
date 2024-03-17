import { Link, useParams } from 'react-router-dom'
import './Verification.css'
import { useApi } from '../../hooks/useApi'
import { useEffect } from 'react'

const Verification = () => {
  const { apiFetch } = useApi()

  const { tokenVerification } = useParams()

  const verification = async () => {
    const route = `users/verification/${tokenVerification}`
    const next = '/verification'
    try {
      await apiFetch(false, 'GET', route, null, next)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (tokenVerification) {
      verification()
    }
  }, [])

  return (
    <section id='welcome'>
      <div className='welcome'>
        <img src='assets/genial.webp' alt='Genial' />
        <h2>¡Correo verificado!</h2>
        <p>Enhorabuena!. Tu correo ha sido verificado correctamente.</p>
        <p>Ya puedes iniciar sesión y disfrutar de la plataforma.</p>
        <p>GRACIAS!</p>
      </div>
      <div className='welcomeLinks'>
        <Link to='/login'>Volver a Login</Link>
      </div>
    </section>
  )
}

export default Verification
