import {Link, useLocation } from 'react-router-dom'

function NavBar() {
    const currentPage = useLocation().pathname;

    return(
        <ul className={`nav nav-item`}>
        <li className={`nav nav-item`}>
          <Link
            to="/"
            className={currentPage === '/' ? `nav-link` : `nav-link`}
          >
            Home
          </Link>
        </li>

          <li className={`nav nav-item`}>
          <Link
            to="/Login"
            className={currentPage === '/Login' ? `nav-link` : `nav-link`}
          >
            Login
          </Link>
        </li>

        <li className={`nav nav-item`}>
          <Link
            to="/Products"
            className={currentPage === '/Products' ? `nav-link` : `nav-link`}
          >
            Products
          </Link>
        </li>

        <li className={`nav nav-item`}>
          <Link
            to="/Cart"
            className={currentPage === '/Cart' ? `nav-link` : `nav-link`}
          >
            Shopping Cart
          </Link>
        </li>
        </ul>
    )
}

export default NavBar