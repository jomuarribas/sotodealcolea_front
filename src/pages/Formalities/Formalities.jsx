import { useEffect } from 'react'
import { useMyUserState } from '../../Context/MyUserContext'
import Loader from '../../components/Loader/Loader'
import { useApi } from '../../hooks/useApi'
import './Formalities.css'

const Formalities = () => {
  const { user, setUser } = useMyUserState()
  const { apiFetch, isLoading } = useApi()
  const id = localStorage.getItem('id')

  const getUser = async () => {
    const route = `users/${id}`
    try {
      const dataApi = await apiFetch(false, 'GET', route, null)
      setUser(dataApi)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      getUser()
    }
  }, [])

  const handleFormalitie = async (e) => {
    e.preventDefault()
    const route = 'users/formalitie'
    const data = {
      email: user.email,
      residential: `${user.residential.street} ${user.residential.number}`,
      formalitie: e.target[0].value,
      message: e.target[1].value,
      completName: `${user.name} ${user.surnames}`,
    }
    try {
      await apiFetch(true, 'POST', route, data, null)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && user && (
        <section id='formalities'>
          <h2>Trámites</h2>
          <div className='formalitiesForm'>
            <p>Rellena el formulario para realizar un trámite:</p>
            <form onSubmit={handleFormalitie}>
              <h3>Solicitado por: {user.name}</h3>
              <label htmlFor='formalitie'>Trámite</label>
              <select name='formalitie' id='formalitie'>
                <option value='changeBank'>Cambiar cuenta bancaria</option>
                <option value='personalInformationUpdate'>
                  Actualizar información de contacto
                </option>
                <option value='WorkPermit'>Solicitar permiso de obra</option>
                <option value='cardOrRemote'>Solicitar tarjeta o mando</option>
              </select>
              <label htmlFor='message'>Mensaje</label>
              <textarea
                name='message'
                id='message'
                required
                cols='30'
                rows='10'
              ></textarea>
              <button className='button'>Enviar</button>
            </form>
          </div>
        </section>
      )}
    </>
  )
}

export default Formalities
