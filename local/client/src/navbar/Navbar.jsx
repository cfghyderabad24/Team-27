import React, { useState } from 'react';
import './Navbar.css';
// import logo from '../Images/logo.png'
// import cart_icon from '../Images/cart_icon.png'

function Navbar() {
  const [menu, setMenu] = useState('shop');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleAnalysisClick = () => {
    setMenu('shop');
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <div className="page">
        <div className='navbar'>
          <p>ROOM FOR READ</p>
          <ul className="nav-menu">
            <li onClick={handleAnalysisClick}>
              Analysis
              {menu === 'shop' ? <hr /> : <></>}
              {dropdownVisible && (
                <ul className="dropdown-menu">
                  <li>Library Analysis</li>
                  <li>Student Analysis</li>
                </ul>
              )}
            </li>
            <li onClick={() => { setMenu('Men'); setDropdownVisible(false); }}>CheckIn/Out{menu === "Men" ? <hr /> : <></>}</li>
            <li onClick={() => { setMenu('Women'); setDropdownVisible(false); }}>Book Management{menu === "Women" ? <hr /> : <></>}</li>
            {/* <li onClick={() => { setMenu("Kids") }}>{menu === "Kids" ? <hr /> : <></>}</li> */}
          </ul>
          <div className='nav-cart'>
            <button>Logout</button>
            {/* <img src={cart_icon} alt='cart_icon' /> */}
            {/* <div className="nav-cart-count">0</div> */}
          </div>
        </div>
        {/* <div className="search-bar-container">
          <input type="text" className="search-bar" placeholder="Search..." />
        </div> */}
      </div>
    </>
  );
}

export default Navbar;
