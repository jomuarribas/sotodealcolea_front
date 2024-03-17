import { Link } from 'react-router-dom'
import './Welcome.css'

const Welcome = () => {
  return (
    <section id='welcome'>
      <div className='welcome'>
        <img src='../assets/genial.webp' alt='Genial' />
        <h2>¡Tu usuario ha sido registrado!</h2>
        <p>
          Te acabamos de enviar un email para que verifiques tu cuenta y puedas
          acceder a la web.
        </p>
        <p>
          Si ves que no te ha llegado es importante que revises tu bandeja de
          Spam.
        </p>
        <p>GRACIAS!</p>
      </div>
      <div className='welcomeLinks'>
        <Link to='/login'>Volver a login</Link>
      </div>
    </section>
  )
}

export default Welcome
