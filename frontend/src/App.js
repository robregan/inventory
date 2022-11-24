import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
} from 'react-router-dom'
import Layout from './components/layout/Layout'
import Sidebar from './components/sidebar/Sidebar'
import Forgot from './pages/auth/Forgot'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Reset from './pages/auth/Reset'
import Dashboard from './pages/dashboard/Dashboard'
import Home from './pages/Home/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot' element={<Forgot />} />
        <Route path='/resetpassword/:resetToken' element={<Reset />} />

        <Route
          path='/dashboard'
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
