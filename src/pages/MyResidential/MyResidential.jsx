import { useEffect, useState } from 'react'
import { useApi } from '../../hooks/useApi'
import './MyResidential.css'
import { useMyUserState } from '../../Context/MyUserContext'
import Loader from '../../components/Loader/Loader'

const MyResidential = () => {
  const { setUser, residential, setResidential } = useMyUserState()
  const { apiFetch, isLoading } = useApi()

  const [residentials, setResidentials] = useState([])
  const [selectedResidential, setSelectedResidential] = useState('')
  const [isMenuOneOpen, setIsMenuOneOpen] = useState(false)
  const [isMenuTwoOpen, setIsMenuTwoOpen] = useState(false)

  const id = localStorage.getItem('id')
  const id_residential = localStorage.getItem('id_residential')

  const menuNavigationOne = () => {
    setIsMenuOneOpen(!isMenuOneOpen)
  }

  const menuNavigationTwo = () => {
    setIsMenuTwoOpen(!isMenuTwoOpen)
  }

  const getResidential = async () => {
    const route = `residentials/${id_residential}`
    try {
      const dataApi = await apiFetch(false, 'GET', route, null)
      setResidential(dataApi)
    } catch (error) {
      console.error(error)
    }
  }

  const getResidentials = async () => {
    const route = 'residentials'
    try {
      const dataApi = await apiFetch(false, 'GET', route, null)
      setResidentials(dataApi)
      setResidentials((prevResidentials) => [
        { memberNumber: '', street: '-', number: '' },
        ...prevResidentials,
      ])
    } catch (error) {
      console.error(error)
    }
  }

  const handleSelectChange = (e) => {
    setSelectedResidential(e.target.value)
    localStorage.setItem('id_residential', e.target.value)
  }

  const updateResidential = async () => {
    const route = `residentials/${selectedResidential}`
    const formData = { users: id }
    try {
      await apiFetch(true, 'PUT', route, formData, null)
      getResidential()
      setResidentials({})
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const route = `users/${id}`
    const formData = { residential: selectedResidential }
    try {
      const uploadUser = await apiFetch(false, 'PUT', route, formData, null)
      setUser(uploadUser.user)
      updateResidential()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (id_residential !== null) {
      getResidential()
    }
  }, [])

  useEffect(() => {
    if (id_residential === null) {
      setResidential()
      getResidentials()
    }
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <section id='myResidential'>
          {residentials.length > 0 && (
            <form onSubmit={handleSubmit}>
              <label htmlFor='residentials'>Selecciona tu parcela:</label>
              <select
                id='residentials'
                name='residentials'
                value={selectedResidential}
                onChange={handleSelectChange}
              >
                {residentials
                  .sort((a, b) => a.memberNumber.localeCompare(b.memberNumber))
                  .map((residential) => (
                    <option key={residential._id} value={residential._id}>
                      {`${residential.street} ${residential.number}`}
                    </option>
                  ))}
              </select>
              <button type='submit' className='button'>
                Añadir
              </button>
            </form>
          )}
          {residential !== undefined && (
            <>
              <div className='residentialData'>
                <h3>Datos de la parcela:</h3>
                <p>
                  <span>Número de socio:</span> {residential.memberNumber}
                </p>
                <p>
                  <span>Dirección:</span> {residential.street}{' '}
                  {residential.number}
                </p>
                <p>
                  <span>Ocupación:</span> {residential.dimension}
                </p>
                <p>---</p>
                <p>
                  <span>Deuda:</span> {residential.debt}
                </p>
                <p>
                  <span>Sanciones:</span> {residential.sanctions}
                </p>
              </div>
              <h4>Usuarios asociados:</h4>
              <div className='residentialUsers'>
                {residential.users.map((user, index) => (
                  <div key={index}>
                    {user.img ? (
                      <img src={user.img} alt='Foto' />
                    ) : (
                      <span className='material-symbols-outlined'>
                        account_circle
                      </span>
                    )}
                    <p>{user.username}</p>
                    <p>({user.category})</p>
                  </div>
                ))}
              </div>
              <div className='expenses' onClick={menuNavigationOne}>
                <h4>
                  <span className='material-symbols-outlined'>
                    arrow_drop_down
                  </span>
                  Gastos
                  <span className='material-symbols-outlined'>
                    arrow_drop_down
                  </span>
                </h4>
              </div>
              <div
                className={`${isMenuOneOpen ? 'expensesOpen' : 'expensesClose'}`}
              >
                <div>
                  <p>{residential.expenses.year}</p>
                </div>
                <div className='expensesDates'>
                  {residential.expenses.map((expense) => (
                    <div key={expense._id} className='expensesDatesDiv'>
                      <div>
                        <p>{expense.year}</p>
                        <p>{expense.month}</p>
                      </div>

                      <table>
                        <thead>
                          <tr>
                            <th>Comunidad</th>
                            <th>Canon</th>
                            <th>Agua</th>
                            <th>Luz</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{expense.comunity} €</td>
                            <td>{expense.cannon} €</td>
                            <td>{expense.water} €</td>
                            <td>{expense.electricity} €</td>
                          </tr>
                        </tbody>
                      </table>
                      <h4>
                        Total recibo:{' '}
                        {expense.comunity +
                          expense.cannon +
                          expense.water +
                          expense.electricity}{' '}
                        €uros
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
              <div className='incidents' onClick={menuNavigationTwo}>
                <h4>
                  <span className='material-symbols-outlined'>
                    arrow_drop_down
                  </span>
                  Incidencias
                  <span className='material-symbols-outlined'>
                    arrow_drop_down
                  </span>
                </h4>
              </div>
              <div
                className={`${isMenuTwoOpen ? 'incidentsOpen' : 'incidentsClose'}`}
              >
                <div className='incidentsDates'>
                  {residential.incidents.length <= 0 ? (
                    <p>No hay ninguna incidencia abierta</p>
                  ) : (
                    residential.incidents.map((incident) => (
                      <div key={incident._id}>
                        <p key={incident._id}>
                          {incident.state === 'Open' && (
                            <span
                              className='material-symbols-outlined folderOpen'
                              style={{ color: 'red' }}
                            >
                              folder_open
                            </span>
                          )}
                          {incident.state === 'Close' && (
                            <span
                              className='material-symbols-outlined folderOpen'
                              style={{ color: 'green' }}
                            >
                              folder
                            </span>
                          )}
                          {incident.subject} - Prioridad ({incident.priority})
                        </p>
                        <div>
                          <p>{incident.message}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </section>
      )}
    </>
  )
}

export default MyResidential
