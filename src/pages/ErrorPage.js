import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className="error">
        <h1>No Page found</h1>
        <Link to='/' >Go to home!</Link>
    </div>
  )
}
