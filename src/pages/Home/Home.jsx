import { Link } from 'react-router-dom'
import './Home.css'
import { useEffect, useState } from 'react'

const Home = () => {
  const [showLink1, setShowLink1] = useState(false)
  const [showLink2, setShowLink2] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowLink1(true)
    }, 200)
    setTimeout(() => {
      setShowLink2(true)
    }, 500)
  }, [])

  return (
    <>
      <section id='home'>
        {showLink1 && (
          <Link to='/myresidential' className='myResidential'>
            <span className='material-symbols-outlined'>home_pin</span>
            <p>Mi parcela</p>
          </Link>
        )}
        {showLink2 && (
          <Link to='/formalities' className='comunications'>
            <span className='material-symbols-outlined'>description</span>
            <p>Tramites</p>
          </Link>
        )}
      </section>
    </>
  )
}

export default Home
