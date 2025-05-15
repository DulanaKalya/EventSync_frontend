import React, {useState} from "react";
import '../../style/navbar.css';
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";


const Navbar = () =>{

    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const isAdmin = ApiService.isAdmin();
    const isAuthenticated = ApiService.isAuthenticated();

    const handleSearchChange =(e) => {
        setSearchValue(e.target.value);
    }

    const handleSearchSubmit = async (e) =>{
        e.preventDefault();
        navigate(`/?search=${searchValue}`)
    }

    const handleLogout = () => {
        const confirm = window.confirm("Are you sure you want to logout? ");
        if(confirm){
            ApiService.logout();
            setTimeout(()=>{
                navigate('/login')
            }, 500);
        }
    }

    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/" > <img src="./eventsync.png" alt="Event Sync" /></NavLink>
            </div>
            {/* SEARCH FORM */}
            <form className="navbar-search" onSubmit={handleSearchSubmit}>
                <input type="text"
                placeholder="Search events"
                value={searchValue}
                onChange={handleSearchChange} />
                <button type="submit">Search</button>
            </form>

            <div className="navbar-link">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/categories" >Categories</NavLink>
                {isAuthenticated && <NavLink to="/profile" >My Account</NavLink>}
                {isAdmin && <NavLink to="/admin" >Admin</NavLink>}
                {!isAuthenticated && <NavLink to="/login" >Login</NavLink>}
                {isAuthenticated &&<NavLink onClick={handleLogout} >Logout</NavLink>}
                <NavLink to="/cart">Cart</NavLink>
            </div>
        </nav>
        /*<div className="navbar-link">
                <NavLink to="/" active >Home</NavLink>
                <NavLink to="/categories" active >Categories</NavLink>
                {isAuthenticated && <NavLink to="/profile" active >My Account</NavLink>}
                {isAdmin && <NavLink to="/admin" active >Admin</NavLink>}
                {!isAuthenticated && <NavLink to="/login" active >Login</NavLink>}
                {isAuthenticated &&<NavLink onClick={handleLogout} active >Logout</NavLink>}
                <NavLink to="/cart" active >Cart</NavLink>
            </div>
        </nav>*/
    );

};
export default Navbar;