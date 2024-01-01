import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/'
import './index.scss'

const Layout = () => {
  return (
    <div className="App">
      <Sidebar />
      <div className="page">

        <Outlet />
        <span className="tags bottom-tags">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
        </span>

        <span className="tags">
          Capstone Design project
          </span>
      </div>
    </div>
  )
}

export default Layout
