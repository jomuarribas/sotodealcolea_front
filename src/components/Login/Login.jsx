import { useForm } from 'react-hook-form'
import { useApi } from '../../hooks/useApi'
import { Link } from 'react-router-dom'
import './Login.css'
import Loader from '../Loader/Loader'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm()
  const { apiFetch, isLoading } = useApi()

  const submit = async (data) => {
    const route = 'users/login'
    const next = '/'
    try {
      const dataApi = await apiFetch(false, 'POST', route, data, next)
      localStorage.setItem('token', dataApi.token)
      localStorage.setItem('id', dataApi.user._id)
      if (dataApi.user.residential !== undefined) {
        localStorage.setItem('id_residential', dataApi.user.residential)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <section id='login'>
          <img src='/assets/logo.webp' alt='Logotipo' />
          <h2>Login:</h2>
          <form onSubmit={handleSubmit(submit)}>
            <div>
              <label htmlFor='username'>Nombre de usuario:</label>
              <input
                type='text'
                id='username'
                autoComplete='current-username'
                {...register('username', {
                  required: 'Debes poner un nombre de usuario',
                })}
                className={formErrors.username ? 'inputError' : ''}
              />
              {formErrors.username && (
                <p className='errors'>{formErrors.username.message}</p>
              )}
            </div>
            <div>
              <label htmlFor='password'>Contraseña:</label>
              <input
                type='password'
                id='password'
                autoComplete='current-password'
                {...register('password', {
                  required: 'Debes poner una contraseña',
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/,
                    message: '8 Caracteres, 1 mayúscula y 1 minúscula',
                  },
                })}
                className={formErrors.password ? 'inputError' : ''}
              />
              {formErrors.password && (
                <p className='errors'>{formErrors.password.message}</p>
              )}
            </div>

            <button className='button' type='submit'>
              Entrar
            </button>
          </form>
          <Link to='/register'>Registrate</Link>
        </section>
      )}
    </>
  )
}

export default Login
