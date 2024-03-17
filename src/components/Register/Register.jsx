import { useForm } from 'react-hook-form'
import { useApi } from '../../hooks/useApi'
import { Link } from 'react-router-dom'
import './Register.css'
import Loader from '../Loader/Loader'
import ReCAPTCHA from 'react-google-recaptcha'
import { useRef } from 'react'

const Register = () => {
  const recaptcha = useRef()
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    watch,
  } = useForm()
  const password = watch('password', '')

  const { apiFetch, isLoading } = useApi()

  const submit = async (data) => {
    const captchaValue = recaptcha.current.getValue()
    if (!captchaValue) {
      return
    }
    const { confirmPassword, ...formData } = data
    const route = 'users/register'
    const next = '/welcome'
    try {
      await apiFetch(false, 'POST', route, formData, next)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <section id='register'>
          <img src='/assets/logo.webp' alt='Logotipo' />
          <h2>Formulario de registro</h2>
          <form onSubmit={handleSubmit(submit)}>
            <div>
              <label htmlFor='username'>Nombre de usuario:</label>
              <input
                type='text'
                id='username'
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
              <label htmlFor='name'>Nombre:</label>
              <input
                type='text'
                id='name'
                {...register('name', { required: 'Debes poner un nombre' })}
                className={formErrors.name ? 'inputError' : ''}
              />
              {formErrors.name && (
                <p className='errors'>{formErrors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor='surnames'>Apellidos:</label>
              <input type='text' id='surnames' {...register('surnames')} />
            </div>
            <div>
              <label htmlFor='telephone'>Teléfono:</label>
              <input
                type='text'
                id='telephone'
                {...register('telephone', {
                  required: 'Debes poner un teléfono',
                  pattern: {
                    value: /^\d{9}$/,
                    message: 'El número debe de tener 9 números',
                  },
                })}
                className={formErrors.telephone ? 'inputError' : ''}
              />
              {formErrors.name && (
                <p className='errors'>{formErrors.telephone.message}</p>
              )}
            </div>
            <div>
              <label>¿Que eres?</label>
              <div className='radio'>
                <div>
                  <input
                    type='radio'
                    id='socio'
                    value='socio'
                    {...register('category', {
                      required: 'Debes seleccionar una categoría',
                    })}
                  />
                  <label htmlFor='socio'>Socio</label>
                </div>
                <div>
                  <input
                    type='radio'
                    id='beneficiario'
                    value='beneficiario'
                    {...register('category', {
                      required: 'Debes seleccionar una categoría',
                    })}
                  />
                  <label htmlFor='beneficiario'>Beneficiario</label>
                </div>
                {formErrors.category && (
                  <p className='errors'>{formErrors.category.message}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor='email'>Correo electrónico:</label>
              <input
                type='email'
                id='email'
                {...register('email', {
                  required: 'Sebes poner un correo electrónico',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'El formato de email no es correcto',
                  },
                })}
                className={formErrors.email ? 'inputError' : ''}
              />
              {formErrors.email && (
                <p className='errors'>{formErrors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor='password'>Contraseña:</label>
              <input
                type='password'
                id='password'
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
            <div>
              <label htmlFor='confirmPassword'>Confirma la contraseña:</label>
              <input
                type='password'
                id='confirmPassword'
                {...register('confirmPassword', {
                  validate: (value) =>
                    value === password || 'Las contraseñas no coinciden',
                })}
                className={formErrors.confirmPassword ? 'inputError' : ''}
              />
              {formErrors.confirmPassword && (
                <p className='errors'>{formErrors.confirmPassword.message}</p>
              )}
            </div>
            <ReCAPTCHA
              className='reCaptcha'
              sitekey='6LfNsZspAAAAAHPfzGET0dB1661qYGK5DxVJIOuA'
              ref={recaptcha}
            />
            <button className='button' type='submit'>
              Enviar
            </button>
          </form>
          <Link to='/login'>Volver a login</Link>
        </section>
      )}
    </>
  )
}

export default Register
