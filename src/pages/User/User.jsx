import { Link } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import { useApi } from '../../hooks/useApi'
import './User.css'
import { useEffect, useState } from 'react'
import { useMyUserState } from '../../Context/MyUserContext'

const User = () => {
  const { user, setUser } = useMyUserState()
  const [fileName, setFileName] = useState('')
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFileName(selectedFile.name)
    }
  }

  const uploadImg = async (e) => {
    e.preventDefault()
    const route = `users/${id}`
    try {
      const uploadUser = await apiFetch(
        true,
        'PUT',
        route,
        e.target,
        null,
        'multipart/form-data',
      )
      setFileName('')
      getUser()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      getUser()
    }
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <section id='user'>
          <div>
            <h2>
              {user.name} {user.surnames}
            </h2>
          </div>

          <div className='image'>
            <div>
              {user.img ? (
                <img src={user.img} alt='Foto' />
              ) : (
                <span className='material-symbols-outlined'>
                  account_circle
                </span>
              )}
            </div>
            <div>
              <h3>Añadir/cambiar foto:</h3>
              <form className='file-input-container' onSubmit={uploadImg}>
                <label htmlFor='file-upload' className='file-upload'>
                  <span className='material-symbols-outlined'>
                    cloud_upload
                  </span>
                </label>
                <input
                  id='file-upload'
                  name='img'
                  className='input-file'
                  type='file'
                  required
                  onChange={handleFileChange}
                />
                {fileName && (
                  <span id='file-name' className='file-name'>
                    {fileName}
                  </span>
                )}
                <button className='button button2' type='submit'>
                  Enviar
                </button>
              </form>
            </div>
          </div>
          <div className='dates'>
            <div>
              <p>Usuario:</p>
              <p>Categoría:</p>
              <p>Email:</p>
              <p>Teléfono:</p>
              <p>Parcela: </p>
            </div>
            <div>
              <p>{user.username}</p>
              <p>{user.category}</p>
              <p>{user.email}</p>
              <p>{user.telephone}</p>
              <Link to='/myresidential'>
                {!user.residential
                  ? 'Parcela no asignada'
                  : `${user.residential.street} ${user.residential.number}`}
              </Link>
            </div>
          </div>
          <div>
            <p>
              Si deseas eliminar tu usuario o hacer alguna modificación de tus
              datos:
            </p>
            <Link to='/formalities'>Haz click aquí</Link>
          </div>
        </section>
      )}
    </>
  )
}

export default User
