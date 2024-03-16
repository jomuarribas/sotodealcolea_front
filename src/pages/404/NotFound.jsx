import './NotFound.css'

const NotFound = () => {
  return (
    <div className='notFound'>
      <span className='material-symbols-outlined'>sentiment_dissatisfied</span>
      <h1>404</h1>
      <p>Page not found</p>
      <p>
        The Page you are looking for doesn`t exist or an other error ocurred
      </p>
      <p>Go back to choose a new direction.</p>
    </div>
  )
}

export default NotFound
