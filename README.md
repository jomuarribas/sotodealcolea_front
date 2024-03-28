![Logo](https://res.cloudinary.com/dbnmjx6vr/image/upload/v1709246885/Logo_SDA_reytxe.webp)

# CDV Soto de Alcolea (Frontend)

Frontend para proyecto Full Stack (MERN Stack).

Aplicación web para gestionar un club social con 240 socios.

## Tecnologías y librerias usadas

**React:** React, react-dom, react-router-dom, react-hook-form, react-google-recaptcha

**Otras:** swetalert2

**Developer:** eslint, prettier

## Despliegues

Backend desplegado en Render

- [https://sotodealcolea-back.vercel.app](https://sotodealcolea-back.vercel.app)

Frontend desplegado en Netlify

- [https://sotodealcolea.netlify.app/](https://sotodealcolea.netlify.app/)

## Inicialización local

Instalación de dependencias

```bash
  npm install
```

Iniciar el servidor web

```bash
  npm run dev
```

## Rutas (páginas)

Página que muestra los datos del usuario

```bash
  /user
```

Página que muestra los datos de la vivienda asociada en el caso de haberla asociado, si no muestra un pequeño formulario para que la asocies.

```bash
  /myresidential
```

Formulario para abrir una incidencia. Después esa incidencia se asociará a la vivienda.

```bash
  /incidents
```

Formulario para realizar un trámite con un desplegable para poder indicar el tipo de trámite que se quiere realizar. Con este formulario se realiza un envio por mail con los datos indicados.

```bash
  /formalities
```

Formulario general para pedir información o ayuda. Con este formulario se realiza un envio por mail con los datos indicados.

```bash
  /help
```

Formulario para realizar el login a la web.

```bash
  /login
```

Página para relizar la verificación del usuario. Se envía desde el mail un token por parametros automaticamente a esta dirección, se comprueba el token y se cambia el parametro del usuario "verificated" a true.

```bash
  /verification/:tokenVerification
```

Página que te da las gracias y confirma la verificación del usuario.

```bash
  /verification
```

Formulario de registro a la web.

```bash
  /register
```

Página que te da las gracias por registrarte en la web.

```bash
  /welcome
```

Página con información con la política de privacidad.

```bash
  /privacypolicy
```

Página con información de los términos y condiciones.

```bash
  /termsOfUse
```

## Uso de customHook (useApi)

CustomHook realizado para cubrir todas las necesidades necesarias para hacer las peticiones a la API del backend.

```javascript
export const useApi = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const apiFetch = async (
    notification, method, route, formData, next, headersContent = 'application/json')
```

Se indica a continuación los parametros que se pasan a la función "apiFetch"

**notification:** Este parametro se pasa con un valor boolean.

    - true: Se activan las notificaciones para que nos muestre un modal con la respuesta de la Api.

    - false: Se desactivan las notificaciones para que no se muestren.

**method:** Se debe de indicar el metodo con el que se va a realizar la petición ya sea GET, POST, PUT o DELETE según la necesidad que se tenga.

**route:** Se debe de indicar la ruta parcial del backend a la que se debe hacer la petición (ejemplo "/users/register").

**formData:** Si se desea enviar información a la Api se debe de indicar esa información en este parámetro.

**next:** en este parámetro se debe de indicar la ruta parcial a la que se debe de redirigir la web según termine de realizar la petición y de ok. Esta ruta a diferencia del parametro "route" se refiere a la ruta del frontend donde se quiere redirigir (ejemplo: "/myresidential").

Importante: Si no se quiere realizar ninguna redirección el valor debe de ser "null"

**headersContext:** En este parametro se debe de indicar la cabecera "Content-Type" de la petición si no se indica nada el valor por defecto es application/json.

    - aplication/json: Es el valor por defecto y el objeto que contenga "formData" será convertido en una cadena Json (JSON.stringify(formData)).

    - multipart/form-data: El objeto será convertido con FormData (new FormData(formData))

OTROS DATOS:

**Estado isLoading:** Se exporta este estado para que se pueda ir proporcionando si está en true o false en función si está en espera la petición o ha terminado para que se pueda ir controlando la carga del "Loader".

## Uso del contexto (My userContext)

El contexto MyUserState provee a la aplicación tanto del estado del usuario como el estado de la vivienda.

En estos estados se guardan los datos de la vivienda (residential) como del usuario (user).

## Licencia

[AGPL 3.0](https://choosealicense.com/licenses/agpl-3.0/)

## Autor

- [@jomuarribas](https://www.github.com/jmarribas)

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://jomuarribas.dev/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jomuarribas/)
