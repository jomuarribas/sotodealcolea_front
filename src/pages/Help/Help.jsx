import { useEffect } from 'react'
import { useMyUserState } from '../../Context/MyUserContext'
import Loader from '../../components/Loader/Loader'
import { useApi } from '../../hooks/useApi'
import './Help.css'

const Help = () => {
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

  const handleHelp = async (e) => {
    e.preventDefault()
    const route = 'users/help'
    const data = {
      email: user.email,
      residential: `${user.residential.street} ${user.residential.number}`,
      subjet: e.target[0].value,
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
        <section id='help'>
          <h2>Trámites</h2>
          <div className='helpForm'>
            <p>Rellena el formulario para solicitar ayuda:</p>
            <form onSubmit={handleHelp}>
              <h3>Solicitado por: {user.name}</h3>
              <label htmlFor='help'>Asunto</label>
              <input type='help' name='help' id='helpInput' required />
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

export default Help
