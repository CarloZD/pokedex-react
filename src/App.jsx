import { Link } from 'react-router-dom'

function App() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#f2f2f2' }}>
      <Link to="/">Home</Link>
      <Link to="/items">Items</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  )
}

export default App
