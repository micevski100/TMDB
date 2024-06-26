import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import logoImg from "../../assets/logo.png";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ChevronDown } from "react-bootstrap-icons";
import SearchButton from "../SearchButton/SearchButton";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <Navbar expand='md' className={classes.navbar}>
        <div className={classes.brandAndToggler}>
          <Navbar.Brand className='ms-4'>
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
        <div className={`me-5 ${classes.list}`}>
          <SearchButton />
          <button className='btn'>
            <FontAwesomeIcon icon={faBell} />
          </button>
          <Dropdown data-bs-theme='dark' align='end'>
            <Dropdown.Toggle variant='success' className='btn'>
              <FontAwesomeIcon icon={faUser} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href='#'>User 1</Dropdown.Item>
              <Dropdown.Item href='#'>User 2</Dropdown.Item>
              <Dropdown.Item href='#'>User 3</Dropdown.Item>
              <Dropdown.Item href='#'>User 4</Dropdown.Item>
              <Dropdown.Item href='#'>Manage Profile</Dropdown.Item>
              <Dropdown.Item href='#'>Transfer Profile</Dropdown.Item>
              <Dropdown.Item href='#'>Account</Dropdown.Item>
              <Dropdown.Item href='#'>Help Center</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar>
    </header>
  );
};

export default MainNavigation;
