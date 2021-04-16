//Imports
import React from 'react'
import { Link } from "react-router-dom";

//Component that lets you easily switch between the pages
export default function NavBar() {
    return (
        <div class="navbar-container">
            <Link class="navbar-link" to={'/'}>
                <p>Homepage</p>
            </Link>
            <Link class="navbar-link" to={"/facts"}>
                <p>All Posts</p>
            </Link>
            
        </div>
    )
}
