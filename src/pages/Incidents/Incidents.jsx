import { useEffect } from 'react'
import { useMyUserState } from '../../Context/MyUserContext'
import Loader from '../../components/Loader/Loader'
import { useApi } from '../../hooks/useApi'
import './Incidents.css'

const Incidents = () => {
  const { apiFetch, isLoading } = useApi()
  const { residential, setResidential } = useMyUserState()

  const id_residential = localStorage.getItem('id_residential')

  const getResidential = async () => {
    const route = `residentials/${id_residential}`
    try {
      const dataApi = await apiFetch(false, 'GET', route, null)
      setResidential(dataApi)
    } catch (error) {
      console.error(error)
    }
  }

  const handleIncident = async (e) => {
    e.preventDefault()
    const route = 'incidents/register'
    const data = {
      memberNumber: residential.memberNumber,
      subject: e.target.subject.value,
      message: e.target.message.value,
      priority: e.target.priority.value,
    }
    try {
      await apiFetch(true, 'POST', route, data, null)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (residential === undefined) {
      getResidential()
    }
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && residential && (
        <section id='incidents'>
          <h2>Incidencias</h2>
          <div className='incidentsForm'>
            <p>Rellena el formulario para abrir una incidencia:</p>
            <form onSubmit={handleIncident}>
              <h3>
                Parcela: {residential.street} {residential.number}
              </h3>
              <label htmlFor='subject'>Asunto</label>
              <input type='text' name='subject' id='subject' required />
              <label htmlFor='message'>Mensaje</label>
              <textarea
                name='message'
                id='message'
                required
                cols='30'
                rows='10'
              ></textarea>
              <label htmlFor='priority'>Prioridad</label>
              <select name='priority' id='priority'>
                <option value='Baja'>Baja</option>
                <option value='Media'>Media</option>
                <option value=''>Alta</option>
              </select>
              <button className='button'>Enviar</button>
            </form>
          </div>
        </section>
      )}
    </>
  )
}

export default Incidents
