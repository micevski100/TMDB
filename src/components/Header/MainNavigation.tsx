import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import logoImg from "../../assets/logo.png";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ChevronDown } from "react-bootstrap-icons";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <Navbar expand='lg' className={classes.navbar}>
        <div className={classes.brandAndToggler}>
          <Navbar.Brand>
            <NavLink to='/'>
              <img src={logoImg} className={classes.logo} alt='Logo' />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar-nav' className={classes.toggler}>
            <span className={classes.togglerText}>
              Browse <ChevronDown className={classes.chevronIcon} />
            </span>
          </Navbar.Toggle>
        </div>
        <Navbar.Collapse id='navbar-nav'>
          <Nav className={classes.list}>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to='/series'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Series
            </NavLink>
            <NavLink
              to='/films'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Films
            </NavLink>
            <NavLink
              to='/latest'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Latest
            </NavLink>
            <NavLink
              to='/myList'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              My List
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default MainNavigation;
