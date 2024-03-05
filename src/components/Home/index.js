import Cookies from 'js-cookie'
import {Link, Redirect} from 'react-router-dom'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div>
      <h1>Find the Job that fits your life</h1>
      <p>Millions of people are searching for jobs</p>
      <Link to="/jobs">
        <button type="button">Find Jobs</button>
      </Link>
    </div>
  )
}

export default Home
