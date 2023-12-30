import React from 'react'
import { Link } from 'react-router-dom'

export default function SideBar() {
  return (
    <nav id="sidebar" className="sidebar js-sidebar">
    <div className="sidebar-content js-simplebar">
        <a className="sidebar-brand" href="index.html">
  <span className="align-middle">Celestine</span>
</a>

        <ul className="sidebar-nav">
            <li className="sidebar-header">
                Pages
            </li>

            <li className="sidebar-item active">
                <Link to='/Home' className="sidebar-link" href="index.html">
      <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Dashboard</span>
    </Link>
            </li>

            <li className="sidebar-item">
                <Link to='/Profile' className="sidebar-link" href="pages-profile.html">
      <i className="align-middle" data-feather="user"></i> <span className="align-middle">Profile</span>
    </Link>
            </li>

            <li className="sidebar-item">
                <Link to='/Sign-In' className="sidebar-link" href="pages-sign-in.html">
      <i className="align-middle" data-feather="log-in"></i> <span className="align-middle">Sign In</span>
    </Link>
            </li>

            <li className="sidebar-item">
                <Link to='/Sign-Up' className="sidebar-link" href="pages-sign-up.html">
      <i className="align-middle" data-feather="user-plus"></i> <span className="align-middle">Sign Up</span>
    </Link>
            </li>

            <li className="sidebar-item">
                <Link to='/Client' className="sidebar-link" href="pages-blank.html">
      <i className="align-middle" data-feather="book"></i> <span className="align-middle">Blank</span>
    </Link>
            </li>

            <li className="sidebar-header">
                Tools & Components
            </li>

            <li className="sidebar-item">
                <Link to='/Formulaire' className="sidebar-link" href="ui-buttons.html">
      <i className="align-middle" data-feather="square"></i> <span className="align-middle">Buttons</span>
    </Link>
            </li>

            <li className="sidebar-item">
                <a className="sidebar-link" href="ui-forms.html">
      <i className="align-middle" data-feather="check-square"></i> <span className="align-middle">Forms</span>
    </a>
            </li>

            <li className="sidebar-item">
                <Link to='/Ouvriers' className="sidebar-link" href="ui-cards.html">
      <i className="align-middle" data-feather="grid"></i> <span className="align-middle">Cards</span>
    </Link>
            </li>

            <li className="sidebar-item">
                <a className="sidebar-link" href="ui-typography.html">
      <i className="align-middle" data-feather="align-left"></i> <span className="align-middle">Typography</span>
    </a>
            </li>

            <li className="sidebar-item">
                <a className="sidebar-link" href="icons-feather.html">
      <i className="align-middle" data-feather="coffee"></i> <span className="align-middle">Icons</span>
    </a>
            </li>

            <li className="sidebar-header">
                Plugins & Addons
            </li>

            <li className="sidebar-item">
                <a className="sidebar-link" href="charts-chartjs.html">
      <i className="align-middle" data-feather="bar-chart-2"></i> <span className="align-middle">Charts</span>
    </a>
            </li>

            <li className="sidebar-item">
                <a className="sidebar-link" href="maps-google.html">
      <i className="align-middle" data-feather="map"></i> <span className="align-middle">Maps</span>
    </a>
            </li>
        </ul>

        <div className="sidebar-cta">
            <div className="sidebar-cta-content">
                <strong className="d-inline-block mb-2">Upgrade to Pro</strong>
                <div className="mb-3 text-sm">
                    Are you looking for more components? Check out our premium version.
                </div>
                <div className="d-grid">
                    <a href="upgrade-to-pro.html" className="btn btn-primary">Upgrade to Pro</a>
                </div>
            </div>
        </div>
    </div>
</nav>
  )
}
