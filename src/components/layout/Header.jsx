import React from 'react'
import { Link } from 'react-router-dom';
const Header = ()=> {
    const styles = {
        display : "flex",
        justifyContent: "space-evenly",
    }
  return (
    <header>
        <div style={styles}>
            <Link to="/">Home</Link>
            <Link to="/board">게시판</Link>
        </div>
        <hr/>
    </header>
  )
}
export default Header;