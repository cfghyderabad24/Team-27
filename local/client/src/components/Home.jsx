import React, { useState } from 'react';
import './Home.css';
// import logo from '../Images/logo.png'
// import cart_icon from '../Images/cart_icon.png'

function Home() {
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
          <li onClick={() => { setMenu('Men1'); setDropdownVisible(false); }}>Home{menu === "Men1" ? <hr /> : <></>}</li>
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
          </ul>
          <div className='nav-cart'>
            <button>Logout</button>
          </div>
        </div>
        <div className="search-bar-container">
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>
        <div className="card-container">
          <div className="card">
            <h3>Top 1</h3>
            <p>Pat at the Zoo</p>
          </div>
          <div className="card">
            <h3>Top 2</h3>
            <p>Fluffy and the Fish</p>
          </div>
          <div className="card">
            <h3>Top 3</h3>
            <p>Stories By John</p>
          </div>
          <div className="card">
            <h3>Top 4</h3>
            <p>The Inspiration</p>
          </div>
          <div className="card">
            <h3>Top 5</h3>
            <p>Knowledge</p>
          </div>
          <div className="card">
            <h3>Top 6</h3>
            <p>The Movie</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
