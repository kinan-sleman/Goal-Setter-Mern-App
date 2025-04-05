import './App.css'
import AppRouter from './routes'
import Header from './components/Header'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <AppRouter />
        </div>
      </Router>
      <ToastContainer aria-label="notification"/>
    </>
  )
}

export default App
